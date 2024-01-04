const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const cors = require('cors');
const {Student} = require('./models')
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/")));
app.use(cors());

app.get('/', (req, res) => {
  return res.redirect('index.html');
});

app.get('/student', (req, res) => {
  return res.redirect('student.html');
});

app.get('/faculty', (req, res) => {
  return res.redirect('faculty.html');
});

app.get('/val', async (req, res) => {
  try {
    const stu = req.query.student;
    const st_pass = req.query.password;
    const name = req.query.name;
    const dept = req.query.dept;
    const year = req.query.year;

    console.log(stu, st_pass, name, dept, year);
    const val = await Student.create({ sid: stu, password: st_pass, name: name, dept: dept, year: year });
    console.log(val);
    res.send("Successfully added student");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding student");
  }
});

app.post('/student-login', async (req, res) => {
  try {
    const stu = req.body.student;
    const st_pass = req.body.password;
    console.log(stu, st_pass);
    const user = await Student.findOne({ where:{sid: stu, password: st_pass }});
    // if (user) {
    //   const val = await studentAttendance.create({ sid: stu, login: new Date() });
    //   console.log(val);
    //   res.send("Successful student login");
    // } else {
    //   res.status(401).send("Invalid credentials");
    // }
    console.log(user);
    return res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error during student login");
  }
});

app.get('/faculty-login', (req, res) => {
  const fac = req.query.sid;
  const fac_pass = req.query.password;

  // Handle faculty login logic here

  res.send("Successful faculty login");
});

app.get('/fac', async (req, res) => {
  try {
    const stu = req.query.faculty;
    const st_pass = req.query.password;
    const name = req.query.name;
    const dept = req.query.dept;

    console.log(stu, st_pass, name, dept);

    const newFaculty = await faculties.create({
      fid: stu,
      password: st_pass,
      fname: name,
      dept,
    });

    res.status(200).send("Successfully added faculty");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error adding faculty");
  }
});

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
