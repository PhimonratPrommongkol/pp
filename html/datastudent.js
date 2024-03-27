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
        const response = await axios.get(`${BASE_URL}/student/${id}`)

        const students = response.data
        console.log(students)
        let firstnameDOM = document.querySelector('input[name=firstname]')
        let lastnameDOM = document.querySelector('input[name=lastname]')
        let ageDOM = document.querySelector('input[name=age]')
        let addressDOM = document.querySelector('input[name=address]')
        let education_levelDOM = document.querySelector('select[name=education_level]')
        let descriptionDOM = document.querySelector('textarea[name=description]')
        
        firstnameDOM.value = students.firstname
        lastnameDOM.value = students.lastname
        ageDOM.value = students.age
        addressDOM.value = students.address
        education_levelDOM.value = students.education_level
        descriptionDOM.value = students.description
        
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
    if (!studentData.description) {
      errors.push('กรุณากรอกคำอธิบาย')
    }
    return errors
  }
  
const submitData = async () => {
    
    let firstnameDOM = document.querySelector('input[name=firstname]')
    let lastnameDOM = document.querySelector('input[name=lastname]')
    let ageDOM = document.querySelector('input[name=age]')
    let addressDOM = document.querySelector('input[name=address]')
    let education_levelDOM =document.querySelector('select[name=education_level]')
    let descriptionDOM = document.querySelector('textarea[name=description]')
    let messageDOM = document.getElementById('message')

    try {
        let studentData = {
          firstname: firstnameDOM.value,
          lastname: lastnameDOM.value,
          age: ageDOM.value,
          address: addressDOM.value,
          education_level: education_levelDOM.value,
          description: descriptionDOM.value
        }
        
        console.log('submit data', studentData)
  
        const errors = validateData(studentData)
        
        if (errors.length > 0) {
            // มี error เกิดขึ้น
            throw {
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                errors: errors
            }
        }
        let message = 'บันทึกข้อมูลเรียบร้อยเเล้ว'

        if(mode == 'CREATE'){
            const response = await axios.post(`${BASE_URL}/students`,studentData)
            console.log('response',response.data)
        } else {//http://localhost:8000/users/17
            const response = await axios.put(`${BASE_URL}/students/${selectedId}`, studentData)
            message = 'แก้ไขข้อมูลเรียบร้อยแล้ว'
            console.log('response', response.data)
        }
        
        messageDOM.innerText = 'บันทึกข้อมูลเรียบร้อยแล้ว'
        messageDOM.className = 'message success'
        
    } catch (error) {
        console.log('error message', error.message)
        console.log('error', error.errors)////

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


