//แสดง ข้อมูลอสังหา .js

const BASE_URL = 'http://localhost:8000';
window.onload = async () => {
  await loadData();
}
const loadData = async () => {

    console.log('loaded')

    
      //1. load user ทั้งหมดออกมาจาก API
   const response = await axios.get(`${BASE_URL}/teachers`);
   console.log(response.data);
   //2. นำข้อมูล user ที่โหลดมาใส่เข้าไปใน html
   const usersDOM = document.getElementById('user');
   //http://localhost:8000/users/1

   
   let htmlData ='<div>'
   htmlData += `<div  class="h1"> รายชื่อคุณครู </div>`
    for(let i=0; i<response.data.length; i++){
        let datateacher = response.data[i];
        htmlData += `<div>
        ${datateacher.id} ${datateacher.firstname_teacher} ${datateacher.lastname_teacher} 
        <a href='teacher.html?id=${datateacher.id}'><button class="edit">Edit</button></a> 
        <button class ='delete' data-id='${datateacher.id}'>Delete</button>
        </div>`;
    }
   htmlData += '</div>';
   usersDOM.innerHTML = htmlData;
   const deleteDOMs = document.getElementsByClassName('delete');
   for(let i=0; i<deleteDOMs.length; i++){
       deleteDOMs[i].addEventListener('click', async (event)=>{
          //ดึง id ของ user ที่ต้องการลบ
          const id = event.target.dataset.id;
          try {//http://localhost:8000/users/1
            await axios.delete(`${BASE_URL}/teachers/${id}`);
            loadData() ///recursive function = เราเรียก function ซ้ำ
          }catch(error){
              console.log('error: ', error);
          }
       });
   }
}