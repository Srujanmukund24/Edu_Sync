const express = require("express");
const dotenv = require('dotenv')
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require('cookie-parser');


// const Student = require("./models/student");
// const Division = require("./models/division");
// const Batch = require("./models/batch");
// const MentorshipGrp = require("./models/mentorshipGrp");
// const Subject = require("./models/assignments");
// const Teacher = require("./models/division");
// const Assignment = require("./models/student");
const teacherController = require('../backend/controllers/teacherController');
const  studentController  = require("./controllers/studentController");
const adminController = require("../backend/controllers/adminController")
const auth = require('../backend/middleware/auth')
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.PORT || 8080;

app.post('/registerTeacher',teacherController.registerTeacher);
app.post('/registerStudent',studentController.registerStudent);
app.post('/loginStudent',studentController.loginStudent);
app.post('/loginTeacher',teacherController.loginTeacher);
app.post('/loginAdmin',adminController.loginAdmin);
app.post('/addSubject',auth.authorizeAdmin,adminController.addSubject);


app.get('/getteachers',adminController.getTeachers);
app.get('/getbatches',adminController.getBatches);
app.post('/addbatches',adminController.addBatch);

app.post('/adddivsion',adminController.addDivision);
app.get('/getdivison',adminController.getDivisions);

app.post('/addmentorshipgrp',adminController.addMentorshipGroup);
app.get('/getmentorshipgrp',adminController.getMentorshipGroups);

app.get('/students/division/:divname',auth.authorizeTeacher,teacherController.getStudentFromDivision);
app.get('/students/batch/:batchname',auth.authorizeTeacher,teacherController.getStudentFromBatch);
app.get('/students/:regid',auth.authorizeTeacher,teacherController.getStudentById);
app.get('/students',adminController.getStudents);

app.post('/teacherchats/:studentId',auth.authorizeTeacher,teacherController.addTeacherChats);
app.get('/getteacherchats/:studentId',auth.authorizeTeacher,teacherController.getTeacherChats);
app.post('/studentchats/:teacherId',auth.authorizeStudent,studentController.addStudentChats);
app.get('/getstudentchats/:teacherId',auth.authorizeStudent,studentController.getStudentsChats);

app.listen(port, () => {
    console.log(
      `Node Server Running on Port ${process.env.PORT || 8080}`
    );
});