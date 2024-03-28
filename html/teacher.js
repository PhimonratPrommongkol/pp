const BASE_URL = 'http://localhost:8000';

let mode = 'CREATE' //default mode
let selectedId =''

window.onload = async () =>{
    const urlParams =new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log('id',id)
    if (id){
    mode = 'EDIT'
    selectedId =id

    //1ดึงข้อมูล user เก่าก่อน
    try {
        const response = await axios.get(`${BASE_URL}/teachers/${id}`)

        const teachers = response.data
        console.log(teachers)
        let firstname_teacherDOM = document.querySelector('input[name=firstname_teacher]')
        let lastname_teacherDOM = document.querySelector('input[name=lastname_teacher]')
        let subject_selectDOM   = document.querySelector('select[name=subject_select]')
        let timeinDOM = document.querySelector('input[name=timein]')
        let timeoutDOM = document.querySelector('input[name=timeout]')
        
        firstname_teacherDOM.value = teachers.firstname_teacher
        lastname_teacherDOM.value = teachers.lastname_teacher
        subject_selectDOM.value = teachers.subject_select
        timeinDOM.value = teachers.timein
        timeoutDOM.value = teachers.timeout

      } catch (error) {
        console.log('error', error)
        console.log('error message', error.message); // แสดงข้อความของข้อผิดพลาด
        console.log('error stack', error.stack); // แสดงรายละเอียดเพิ่มเติมของข้อผิดพลาด
      }
    }
  }

  const validateDatatea = (teacherData) => {
    let errors = []
    if (!teacherData.firstname_teacher) {
        errors.push('กรุณากรอกชื่อ')
    }
    if (!teacherData.lastname_teacher) {
      errors.push('กรุณากรอกนามสกุล')
    }
    if (!teacherData.subject_select) {
      errors.push('กรุณากรอกวิชา')
    }
    if (!teacherData.timein) {
      errors.push('กรุณากรอกเวลาเริ่ม')
    }
    if (!teacherData.timeout) {
      errors.push('กรุณากรอกเวลาสิ้นสุด')
    }
    
    return errors
  }
  
const submitData = async () => {
    
    let firstname_teacherDOM = document.querySelector('input[name=firstname_teacher]')
    let lastname_teacherDOM = document.querySelector('input[name=lastname_teacher]')
    let subject_selectDOM   = document.querySelector('select[name=subject_select]')
    let timeinDOM = document.querySelector('input[name=timein]')
    let timeoutDOM = document.querySelector('input[name=timeout]')

    let messageDOM = document.getElementById('message')
    
    try {
        let TeacherData = {
          firstname_teacher: firstname_teacherDOM.value,
          lastname_teacher: lastname_teacherDOM.value,
          subject_select: subject_selectDOM.value,
          timein: timeinDOM.value,
          timeout: timeoutDOM.value,
        }
        
        console.log('submit data', TeacherData)
  
        const errors = validateDatatea(TeacherData)
        
        if (errors.length > 0) {
            // มี error เกิดขึ้น
            throw {
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                errors: errors
            }
        }
        let message = 'บันทึกข้อมูลเรียบร้อยเเล้ว'

        if(mode == 'CREATE'){
            const response = await axios.post(`${BASE_URL}/teachers`,TeacherData)
            console.log('response',response.data)
        } else {//http://localhost:8000/users/17
            const response = await axios.put(`${BASE_URL}/teachers/${selectedId}`, TeacherData)/// ผิดยังไง
            message = 'แก้ไขข้อมูลเรียบร้อยแล้ว'
            console.log('response', response.data)
        }
        
        messageDOM.innerText = 'บันทึกข้อมูลเรียบร้อยแล้ว'
        messageDOM.className = 'message success'
        
    } catch (error) {
        console.log('error message', error.message)
        console.log('error', error.errors)

        if (error.response) {
            console.log(error.response)
            error.message = error.response.data.message
            error.errors =error.response.data.errors
        }
        
        let htmlData = '<div><ul>'
        htmlData += `<div>${error.message}</div>`
        for (let i = 0; i < error.errors.length; i++) {
            htmlData += `<li>${error.errors[i]}</li>`;
        }

        htmlData += '</ul></div>'

        messageDOM.innerHTML = htmlData
        messageDOM.className = 'message danger'
    }
}




