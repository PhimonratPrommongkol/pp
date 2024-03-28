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

        const students = response.data
        console.log(students)
        let firstnameDOM = document.querySelector('input[name=firstname]')
        let lastnameDOM = document.querySelector('input[name=lastname]')
        let ageDOM = document.querySelector('input[name=age]')
        let addressDOM = document.querySelector('input[name=address]')
        let education_levelDOM = document.querySelector('select[name=education_level]')
        
        let subject_selectDOM = document.querySelector('select[name=subject_select]')
        let grade_selectDOM = document.querySelector('select[name=grade_select]')
        let activity_subjectDOM = document.querySelector('select[name=activity_subject]')
        
        
        firstnameDOM.value = students.firstname
        lastnameDOM.value = students.lastname
        ageDOM.value = students.age
        addressDOM.value = students.address
        education_levelDOM.value = students.education_level
       
        subject_selectDOM.value = students.subject_select
        grade_selectDOM.value = students.grade_select
        activity_subjectDOM.value = students.activity_subject
      } catch (error) {
        console.log('error', error)
        console.log('error message', error.message); // แสดงข้อความของข้อผิดพลาด
        console.log('error stack', error.stack); // แสดงรายละเอียดเพิ่มเติมของข้อผิดพลาด
      }
    }
  }

  const validateData = (studentData) => {
    let errors = []
    if (!studentData.firstname) {
        errors.push('กรุณากรอกชื่อ')
    }
    if (!studentData.lastname) {
      errors.push('กรุณากรอกนามสกุล')
    }
    if (!studentData.age) {
      errors.push('กรุณากรอกอายุ')
    }
    if (!studentData.address) {
      errors.push('กรุณากรอกที่อยู่')
    }
    if (!studentData.education_level) {
      errors.push('กรุณากรอกระดับการศึกษา')
    }
    
    if (!studentData.subject_select) {
      errors.push('กรุณากรอกวิชา')
    }
    if (!studentData.grade_select) {
      errors.push('กรุณากรอกเกรด')
    }
    if (!studentData.activity_subject) {
      errors.push('กรุณากรอกกิจกรรมเสริมการเรียน')
    }
    return errors
  }
  
const submitData = async () => {
    
    let firstnameDOM = document.querySelector('input[name=firstname]')
    let lastnameDOM = document.querySelector('input[name=lastname]')
    let ageDOM = document.querySelector('input[name=age]')
    let addressDOM = document.querySelector('input[name=address]')
    let education_levelDOM =document.querySelector('select[name=education_level]')
    
    let subject_selectDOM =document.querySelector('select[name=subject_select]')
    let grade_selectDOM =document.querySelector('select[name=grade_select]')
    let activity_subjectDOM =document.querySelector('select[name=activity_subject]')


    let messageDOM = document.getElementById('message')
    
    try {
        let StudentData = {
          firstname: firstnameDOM.value,
          lastname: lastnameDOM.value,
          age: ageDOM.value,
          address: addressDOM.value,
          education_level: education_levelDOM.value,
        
          subject_select: subject_selectDOM.value,
          grade_select: grade_selectDOM.value,
          activity_subject: activity_subjectDOM.value

        }
        
        console.log('submit data', StudentData)
  
        const errors = validateData(StudentData)
        
        if (errors.length > 0) {
            // มี error เกิดขึ้น
            throw {
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                errors: errors
            }
        }
        let message = 'บันทึกข้อมูลเรียบร้อยเเล้ว'

        if(mode == 'CREATE'){
            const response = await axios.post(`${BASE_URL}/teachers`,StudentData)
            console.log('response',response.data)
        } else {//http://localhost:8000/users/17
            const response = await axios.put(`${BASE_URL}/teachers/${selectedId}`, StudentData)/// ผิดยังไง
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




