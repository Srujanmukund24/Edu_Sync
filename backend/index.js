const express = require("express");
const dotenv = require('dotenv')
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser")
const path = require("path")


// const Student = require("./models/student");
// const Division = require("./models/division");
// const Batch = require("./models/batch");
// const MentorshipGrp = require("./models/mentorshipGrp");
// const Subject = require("./models/subject");
// const Teacher = require("./models/division");
// const Assignment = require("./models/student");
const teacherController = require('../backend/controllers/teacherController');
const studentController = require("./controllers/studentController");
const adminController = require("../backend/controllers/adminController")
const auth = require('../backend/middleware/auth');
const MentorshipGroup = require("./models/mentorshipGrp");
const Conversation = require("./models/conversation");
const {uploadfile} = require("./controllers/teacherController")

dotenv.config();
connectDB();

global._basedir = __dirname;
const multer = require("multer");

console.log(_basedir);
const app = express();

const clientUrl = process.env.CLIENT_URL;
app.use(cors({
    credentials: true,
    origin: clientUrl,
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const port = process.env.PORT || 8080;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(_basedir, "/uploads"));
    },
    filename: (req, file, cb) => { 
        cb(null, file.originalname);
    },
    createParentPath: true
});
const upload = multer({ storage: storage });

app.post("/addOrUpdateMarksOfSubjects", upload.single("uploadfile"), teacherController.uploadfile);
app.post("/addOrUpdateMarksOfPractical", upload.single("uploadfile"), teacherController.uploadfilePractical);


app.post('/registerTeacher', teacherController.registerTeacher);
app.post('/registerStudent', studentController.registerStudent);
app.post('/loginStudent', studentController.loginStudent);
app.post('/loginTeacher', teacherController.loginTeacher);
app.post('/loginAdmin', adminController.loginAdmin);
app.delete('/removeTeacher/:regid', adminController.removeTeacher);
app.delete('/removeStudent/:regid', adminController.removeStudent);
app.post('/addStudentsSubjectInfo', adminController.AddOrUpdateStudentsSubjectInfo);



app.get('/getstudents', adminController.getStudents);
app.get('/getteachers', adminController.getTeachers);
app.get('/getbatches', adminController.getBatches); 
app.post('/addbatches', adminController.addBatch);

app.post('/adddivision', adminController.addDivision);
app.get('/getdivision', adminController.getDivisions);

app.post('/addmentorshipgrp', adminController.addMentorshipGroup);
app.get('/getmentorshipgrp', adminController.getMentorshipGroups);
app.get('/getgrpbyteacher',auth.authorizeTeacher, teacherController.getGroupbyTeacher);

app.get('/students/division/:divID',  teacherController.getStudentFromDivision);
app.get('/students/batch/:batchID', teacherController.getStudentFromBatch);
app.get('/students/:regid', auth.authorizeTeacher, teacherController.getStudentById);

app.get('/getadmin', auth.authorizeAdmin, adminController.getCurrentAdmin)
app.get('/getcurrentteacher', auth.authorizeTeacher, teacherController.getCurrentTeacher)
app.get('/getcurrentstudent', auth.authorizeStudent, studentController.getCurrentStudent) 

app.post('/teacherchats/:studentId', auth.authorizeTeacher, teacherController.addTeacherChats);
app.get('/getteacherchats/:studentId', auth.authorizeTeacher, teacherController.getTeacherChats);
app.post('/studentchats/:teacherId', auth.authorizeStudent, studentController.addStudentChats);
app.get('/getstudentchats/:teacherId', auth.authorizeStudent, studentController.getStudentsChats);

app.get('/myDivisions', auth.authorizeTeacher, teacherController.getMyDivisions);
app.get('/myBatches', auth.authorizeTeacher, teacherController.getMyBatches);

app.post('/createAssignment', auth.authorizeTeacher, teacherController.createAssignment);
app.post('/addStudentsPracticalInfo', adminController.AddOrUpdateStudentsPracticalInfo);

app.get('/getAssignments', auth.authorizeStudent, studentController.getAssignments);
app.get('/getAssignmentsforteacher', auth.authorizeTeacher, teacherController.getAssignmentsForTeacher);
app.get('/getCompleted', auth.authorizeStudent, studentController.getCompletedAssignments);
app.get('/getIncomplete', auth.authorizeStudent, studentController.getIncompleteAssignments);

app.get('/teachers/:teacherID', teacherController.getTeacherByID);

app.post('/addSubject', auth.authorizeAdmin, adminController.addSubject);
app.post('/addPractical', auth.authorizeAdmin, adminController.addPractical);

app.put('/updateAssignment', auth.authorizeStudent, studentController.updateAssignment);

app.get('/student/myChats', auth.authorizeStudent, studentController.myChats);
app.get('/teacher/myChats', auth.authorizeTeacher, teacherController.myChats);

app.get('/getSubjects', adminController.getSubjects);
app.get('/getPracticals', adminController.getPracticals);

app.get('/divisions/:divisionID',studentController.getDivisionByID);
app.get("/batches/:batchID", studentController.getBatchByID);
app.get(
  "/getStudentSubjectInfo",
  auth.authorizeStudent ,studentController.getStudentSubjectInfo
);
app.get(
  "/getStudentPracticalInfo",
  auth.authorizeStudent ,studentController.getStudentPracticalInfo
);


app.get("/student/myChats", auth.authorizeStudent, studentController.myChats);
app.get("/teacher/myChats", auth.authorizeTeacher, teacherController.myChats);

app.listen(port, () => {
    console.log(
        `Node Server Running on Port ${process.env.PORT || 8080}`
    );
});