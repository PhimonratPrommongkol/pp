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
  if (!studentData.description) {
    errors.push('กรุณากรอกคำอธิบาย')
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
    let Estate = req.body;
    const errors = validateData(Estate)
    if (errors.length > 0) {
      throw { message : 'กรุณากรอกข้อมูลให้ครบถ้วนน๊ะจะหลังบ้าน' ,
      errors : errors }
    }

  const results = await conn.query('INSERT INTO students SET ?', Estate)
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
app.get('/students/:id', async (req, res) => {
  try {
    let Estate = req.params.id
    const results = await conn.query('SELECT * FROM students WHERE id = ?', Estate)
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
    let Estate = req.params.id;
    let updateEstates = req.body;
  const results = await conn.query(
    'UPDATE Estates SET ? WHERE id = ?', 
    [updateEstates, Estate]
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

app.listen(port, async (req, res) => {
  await initMySQL()
    console.log('http server running on', + port);
})