const express = require('express')
const app= express()
const bodyParser = require("body-parser");
const path = require("path");
const { students , studentAttendence , facultyAttendence} = require('./models')
var cors = require('cors');
const { clear } = require('console');
const faculty = require('./models/faculty');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/")));
app.use(cors())

app.get('/',(req,res)=>{
  return res.redirect('index.html')
})
app.get('/student',(req,res)=>{
return res.redirect('student.html')
})
app.get('/faculty',(req,res)=>{
return res.redirect('faculty.html')
})
app.get('/val',async(req,res)=>{
const stu = req.query.student;
const st_pass=req.query.password;
const name=req.query.name;
const dept=req.query.dept;
const year=req.query.year;
console.log(stu,st_pass,name,dept,year)
const val = await students.create({sid:stu,password:st_pass,name:name,dept:dept,year:year})
console.log(val);
})
//data from student form
app.get('/student-login',async (req,res)=>{
const stu = req.query.student;
const st_pass=req.query.password;
students.findOne({sid:stu , password:st_pass}).then(async(user)=>{
  const val = await studentAttendence.create({sid:stu , login:new Date()})
console.log(val);
}
)
return res.send("successful")
});

//data from faculty form
app.get('/faculty-login',(req,res)=>{
const fac = req.query.sid;
console.log(fac);
const fac_pass= req.query.password;
console.log(fac_pass);
return res.send("successful")
});
app.get('/fac', async (req, res) => {
  try {
    const stu = req.query.faculty;
    const st_pass = req.query.password;
    const name = req.query.name;
    const dept = req.query.dept;

    console.log(stu, st_pass, name, dept);

    // Use await with faculty.create and handle the result
    const newFaculty = await faculty.create({
      fid: stu,
      password: st_pass,
      fname: name,
      dept: dept
    });

    res.status(200).send("yo its working"); // Send response inside try block
  } catch (err) {
    console.error(err);
    res.status(400).send("not working");
  }
});

app.listen(3000,()=>{
console.log("started at  3000");
})