const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const cors = require('cors');
const {Student,STUDENTATTENDANCE,Faculty,FACULTYATTENDANCE} = require('./models')
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/")));
app.use(cors());
const today=new Date()

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
app.get('/valf', async (req, res) => {
  try {
    const faculty = req.query.faculty;
    const fa_pass = req.query.password;
    const name = req.query.name;
    const dept = req.query.dept;
    console.log(faculty, fa_pass, name, dept);
    const val = await Faculty.create({ fid: faculty, password: fa_pass, name: name, dept: dept});
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
     if (user) {
       const val = await STUDENTATTENDANCE.create({ sid: stu});
      res.send("Successful student login");
     } else {
       res.status(401).send("Invalid credentials");
     }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error during student login");
  }
});

app.post('/faculty-login', async(req, res) => {
  try{const fac = req.body.fid;
  const fac_pass = req.body.password;
  const user= await Faculty.findOne({where:{fid:fac,password:fac_pass}});
  if(user){
      const val= await FACULTYATTENDANCE.create({fid:fac})
      console.log(val);
      res.send("successful faculty login");
        }
    else{
            req.status(401).send("Invalid credentials");
        }
   }catch(error){
        console.log(error);
        res.status(500).send("Error during facultu login");
        }
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
