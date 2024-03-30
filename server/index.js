const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const cors = require('cors')
const app = express();

app.use(bodyParser.json());
app.use(cors())

const port = 8000;

let conn = null;

const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'webdb',
    port: 2205
  })
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

// path = GET /users สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา
app.get('/students', async (req, res) => {
  const results = await conn.query('SELECT * FROM students')
  res.json(results[0]);
})

// path = POST /users สำหรับการสร้าง users ใหม่บันทึกเข้าไป
app.post('/students', async (req, res) => {
  try {
    let stu = req.body;
    const errors = validateData(stu)
    if (errors.length > 0) {
      throw { message : 'กรุณากรอกข้อมูลให้ครบถ้วนน๊ะจะหลังบ้าน' ,
      errors : errors }
    }

  const results = await conn.query('INSERT INTO students SET ?', stu)
  res.json({
    message: 'Create user successfully',
    data: results[0]
  })
  }catch (error) {
    const errorMessage = error.errors || 'something wrong'
    const errors = error.errors || []
    console.error('error message', error.message)
    res.status(500).json({
      message: errorMessage,
      error : errors
    })
  }
})


// path = GET /users/:id สำหรับการดึง users รายคนออกมา
app.get('/Students/:id', async (req, res) => {
  try {
    let stu = req.params.id
    const results = await conn.query('SELECT * FROM students WHERE id = ?', stu)
    if (results[0].length == 0) {
      throw { statusCode: 404, message: 'หาไม่เจอ' }
    }
    res.json(results[0][0])
  } catch (error) {
    console.error('error message', error.message)
    let statusCode = error.statusCode || 500
    res.status(statusCode).json({
      message: 'something wrong',
      errorMessage: error.message
    })
  }
})

//path = PUT /users/:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
app.put('/students/:id', async (req, res) => {
  try {
    let stu = req.params.id;
    let updatestu = req.body;
  const results = await conn.query(
    'UPDATE students SET ? WHERE id = ?', 
    [updatestu, stu]
    )
  console.log('results', results)
  res.json({
    message: 'Create user successfully',
    data: results[0]
  })
  }catch (error) {
    console.error('error message', error.message)
    res.status(500).json({
      message: 'something worng',
    })
  }
})

// path = DELETE /users/:id สำหรับการลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
app.delete('/students/:id', async (req, res) => {
  try {
    let id = req.params.id;
  const results = await conn.query('DELETE FROM students WHERE id = ?', id)
  console.log('results', results)
  res.json({
    message: 'Delete user successfully',
    data: results[0]
  })
  }catch (error) {
    console.error('error message', error.message)
    res.status(500).json({
      message: 'something worng',
    })
  }
})
/////////////////////////////////////////////////////////////////
const validateDatatea = (teacherData) => {//แก้
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

// path = GET /users สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา
app.get('/teachers', async (req, res) => {
  const results = await conn.query('SELECT * FROM teachers')
  res.json(results[0]);
})

// path = POST /users สำหรับการสร้าง users ใหม่บันทึกเข้าไป
app.post('/teachers', async (req, res) => {
  try {
    let Teacher = req.body;
    const errors = validateDatatea(Teacher)
    if (errors.length > 0) {
      throw { message : 'กรุณากรอกข้อมูลให้ครบถ้วนน๊ะจะหลังบ้าน' ,
      errors : errors }
    }

  const results = await conn.query('INSERT INTO teachers SET ?', Teacher)
  res.json({
    message: 'Create user successfully',
    data: results[0]
  })
  }catch (error) {
    const errorMessage = error.errors || 'something wrong'
    const errors = error.errors || []
    console.error('error message', error.message)
    res.status(500).json({
      message: errorMessage,
      error : errors
    })
  }
})


// path = GET /users/:id สำหรับการดึง users รายคนออกมา
app.get('/teachers/:id', async (req, res) => {
  try {
    let Teacher = req.params.id
    const results = await conn.query('SELECT * FROM teachers WHERE id = ?', Teacher)
    if (results[0].length == 0) {
      throw { statusCode: 404, message: 'หาไม่เจอ' }
    }
    res.json(results[0][0])
  } catch (error) {
    console.error('error message', error.message)
    let statusCode = error.statusCode || 500
    res.status(statusCode).json({
      message: 'something wrong',
      errorMessage: error.message
    })
  }
})

//path = PUT /users/:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
app.put('/teachers/:id', async (req, res) => {
  try {
    let Teacher = req.params.id;
    let updateTeachers = req.body;
  const results = await conn.query(
    'UPDATE teachers SET ? WHERE id = ?', 
    [updateTeachers, Teacher]
    )
  console.log('results', results)
  res.json({
    message: 'Create user successfully',
    data: results[0]
  })
  }catch (error) {
    console.error('error message', error.message)
    res.status(500).json({
      message: 'something worng',
    })
  }
})

// path = DELETE /users/:id สำหรับการลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
app.delete('/teachers/:id', async (req, res) => {
  try {
    let id = req.params.id;
  const results = await conn.query('DELETE FROM teachers WHERE id = ?', id)
  console.log('results', results)
  res.json({
    message: 'Delete user successfully',
    data: results[0]
  })
  }catch (error) {
    console.error('error message', error.message)
    res.status(500).json({
      message: 'something worng',
    })
  }
})

/////////////////////////////////////////////////////////////////
app.listen(port, async (req, res) => {
  await initMySQL()
    console.log('http server running on', + port);
})