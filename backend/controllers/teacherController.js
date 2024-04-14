const Teacher = require('../models/teacher')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Student = require('../models/student');
const Conversation = require('../models/conversation');
const Assignment = require('../models/assignments');
const Subject = require('../models/studentsubjectinfo');
const excelToJson = require("convert-excel-to-json");
const fs = require("fs");
const XLSX = require("xlsx");
const Practical = require('../models/studentpracticalinfo');
const MentorshipGroup = require('../models/mentorshipGrp');

// --------------------------------------------Controller for assigning marks to student-------------------------------------------
// Note : hearders of Excel sheet  rollno | subname1 | subname2 | subname3  (write rollno as it is and subname in uppercase)
//                             eg. rollno  | CC      | AI       | DSBDA
//                                 31101   | 50      | 80       | 90
// SheetName should match with test_type Name eg.UT1, UT2, INSEM (exel file chya aat aste sheet bottom la name change karu shakta)

const excelDataToSubjects = async (excelData, type) => {
    try {
        for (let sheetName in excelData) {
            const data = excelData[sheetName];
            console.log("data - ",data);
            for (let row of data) {
                const { rollno, ...subjectMarks } = row;
                const student = await Student.findOne({ rollno: rollno });
                if (!student) {
                    console.log(`Student with Roll No ${rollno} not found`);
                    continue; 
                }

                for (let subname in subjectMarks) {
                    const existingSubject = type==="practical" ? await Practical.findOne({ std_id: student._id, pracsubname : subname.toUpperCase() }) : await Subject.findOne({ std_id: student._id, subname : subname.toUpperCase() });
                    if (!existingSubject) {
                        console.log(`Subject '${subname}' not found for student with Roll No ${rollno}`);
                        throw new Error(`Subject '${subname}' not found for student with Roll No ${rollno}`);
                    }

                    const existingMarkIndex = existingSubject.marks.findIndex((ele) => ele.test_type === sheetName);
                    if (existingMarkIndex !== -1) {
                        existingSubject.marks[existingMarkIndex].marks = subjectMarks[subname];
                    } else {
                        existingSubject.marks.push({ test_type: sheetName, marks: subjectMarks[subname] });
                    }

                    await existingSubject.save();
                    console.log(`Marks updated for subject '${subname}' for student with Roll No ${rollno}`);
                }
            }
        }
    } catch (err) {
        console.log("Error storing subject marks:", err);
        throw err;
    }
};

const importExcelData2MongoDB = async (filePath,type) => {
    try {
        const workbook = XLSX.readFile(filePath);
        const sheetNames = workbook.SheetNames;
        console.log("Sheet names: ", sheetNames);

        const sheet_array = [];
        
        sheetNames.forEach(sheetName => {
            const worksheet = workbook.Sheets[sheetName];
            const filterHeader = {};
            for(let key in worksheet){
                if(key.endsWith('1') && worksheet[key].hasOwnProperty('v')){
                    const newKey = key.substring(0, key.length - 1);
                    const val = worksheet[key].v;
                    const str = val.toLowerCase();
                    filterHeader[newKey] = str.trim();
                }
            }

            console.log(filterHeader);
            sheet_array.push({
                name: sheetName, 
                header: {
                    rows: 1,
                }, 
                columnToKey: filterHeader,
            });  
        }); 

        const excelData = await excelToJson({
            sourceFile: filePath,
            sheets: sheet_array
        });

        console.log("Excel data : ", excelData);
        excelDataToSubjects(excelData,type);
        fs.unlinkSync(filePath); 
    } catch (err) {
        console.log("Error importing data to MongoDB:", err);
        throw err;
    }
};

exports.uploadfile = async (req, res) => {
    try {
        const filePath = await req.file.path; 
        console.log(filePath);
        await importExcelData2MongoDB(filePath,"subject"); 
        res.json({
            msg: "File Uploaded",
            file: req.file?.filename,
        });
    } catch (err) {
        console.log("Error uploading file:", err);
        res.status(500).json({ error: "Failed to upload file" });
    }
};

exports.uploadfilePractical = async (req, res) => {
    try {
        const filePath = await req.file.path; 
        console.log(filePath);
        await importExcelData2MongoDB(filePath,"practical"); 
        res.json({
            msg: "File Uploaded",
            file: req.file?.filename,
        });
    } catch (err) {
        console.log("Error uploading file:", err);
        res.status(500).json({ error: "Failed to upload file" });
    }
};


//----------------------------------------------------------------------------------------------------------------------------------
exports.registerTeacher = async(req,res)=>{
    
    const {regid,fname,lname,email,mobile,password} = req.body;
   
    if(!regid || !fname || !lname || !email || !mobile || !password){
        return res.status(400).send("Fill complete details") 
    }
    
    const user = await Teacher.findOne({email:email})
    if(user) return res.status().send("Teacher already exists with same email")
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newTeacher = new Teacher({
            regid:regid,
            fname:fname,
            lname:lname,
            email:email,
            mobile:mobile,
            password:hashedPassword
        })
        await newTeacher.save();
       
        return res.status(200).json(newTeacher);
    }
    catch(err){
        return res.status(400).json({message:err.message});
    }
}

exports.loginTeacher = async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).send("Fill All Details")
    }
    const user = await Teacher.findOne({email});
    if(!user) return res.status(409).send("Teacher Does not exist");

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) return res.status(401).send("Invalid Password");
    
    try{
        const token = jwt.sign({email,teacher_id:user._id},process.env.SECRET_KEY,
            {
                expiresIn:'1d',
            }
        )
        res.cookie("jwt",token,{httpOnly:true,secure:true,maxAge:60000*24*60});
        user.token = token;
        console.log(user);
        return res.status(200).json(user)

    }
    catch(err){
        return res.status(400).json({message:err.message});
    }
}

exports.getStudentFromDivision = async(req,res)=>{
    const {divID} = req.params;
    console.log(req.params);

    const students = await Student.find({division : divID});
    console.log(students);
    if(!students){
        return res.status(404).json({message:"students not found"});
    }
    return res.status(200).json(students);
}

exports.getStudentFromBatch = async(req,res)=>{
    const {batchID} = req.params;
    console.log(req.params);

    const students = await Student.find({batch:batchID});
    if(!students){
        return res.status(404).json({message:"students not found"});
    }
    return res.status(200).json(students);
}

exports.getStudentById = async(req,res)=>{
    const {regid} = req.params;
    const student = await Student.findOne({regid:regid});
    if(!student){
        return res.status(404).json({message:"Student Not Found"});
    }
    return res.status(200).json(student);
}

exports.addTeacherChats = async (req, res) => {
    try {
        console.log(req.teacher);
        const teacherId = req.teacher.teacher_id;
        const {studentId} = req.params;
        const sender = "teacher";
        const receiver = "student";
        const message = req.body.message;

        // Find the student by ID
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        // Construct chat object
        const chat = {
            sender: sender,
            receiver: receiver,
            message: message
        };

        // Create conversation or find existing one
        let conversation = await Conversation.findOne({ teacherId: teacherId, studentId: studentId });

        // If conversation doesn't exist, create a new one
        if (!conversation) {
            conversation = new Conversation({
                teacherId: teacherId,
                studentId: studentId,
                chats: [chat] // Add the chat to the chats array
            });
        } else {
            // If conversation exists, push the new chat to the existing chats array
            conversation.chats.push(chat);
        }

        // Save the conversation
        await conversation.save();

        res.status(201).json({ message: 'Chat added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTeacherChats = async (req, res) => {
    try {
        const teacherId = req.teacher.teacher_id;
        const {studentId} = req.params;

        // Find conversation between the teacher and student
        const conversation = await Conversation.findOne({ teacherId: teacherId, studentId: studentId });

        // Check if conversation exists
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        // Return the chats from the conversation
        res.status(200).json({ chats: conversation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMyDivisions = async(req,res)=>{
    const teacherID = req.teacher.teacher_id;
    const teacherObj = await Teacher.findOne({_id:teacherID});

    if(!teacherObj){
        return res.status(404).json({message:"Teacher object not found"});
    }
    const divisions = teacherObj.division;
    console.log(divisions)
    return res.status(200).json(divisions);
}

exports.getMyBatches = async(req,res)=>{
    const teacherID = req.teacher.teacher_id;
    const teacherObj = await Teacher.findOne({_id:teacherID});

    if(!teacherObj){
        return res.status(404).json({message:"Teacher object not found"});
    }
    const batches = teacherObj.batch;
    console.log(batches)
    return res.status(200).json(batches);
}

exports.createAssignment = async(req,res) =>{
    try{
        const teacherID = req.teacher.teacher_id;
        const {studentIds,problemStatement} = req.body;

        //array of student IDs
        if(!problemStatement){
            return res.status(404).json({message:"Problem Statement Required"});
        }
        if(studentIds.length === 0){
            return res.status(404).json({message:"studentIDs not found"});
        }
        
        studentIds.forEach(async (studentID)=>{
            const subject = await Subject.findOne({std_id:studentID,teacher_id:teacherID});
            const newAssignment = new Assignment({
                teacher_id:teacherID,
                student_id:studentID,
                subject:subject._id,
                problemstatement:problemStatement,
                uploaded_doc_link:''
            })
            await newAssignment.save();
        })
        return res.status(200).json({message:"Assignments created successfully"});
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
    
}

exports.getCurrentTeacher=async(req,res)=>{
    try{
        const teacher=await Teacher.findById(req.teacher.teacher_id);
        if(!teacher){
            return res.status(400).json("No teacher found")
        }
        return res.status(200).json(teacher);
    }catch(error){
        res.status(500).json({error:error.message});
    }
}

exports.getTeacherByID = async(req,res)=>{
    try{
        const {teacherID} = req.params;
        console.log(teacherID);
        const teacher = await Teacher.findOne({_id:teacherID});
        console.log(teacher)
        if(!teacher){
            return res.status(404).json({message:"Teacher Object Not Found"});
        }
        return res.status(200).json(teacher);
    }
    catch(err){
        return res.status(400).json({message:err.message});
    }
    
}
exports.getGroupbyTeacher=async(req,res)=>{
    try {
        const teacherId = req.teacher.teacher_id;

        // Fetch mentorship groups for the specified teacher and populate teacher and student fields with names
        const mentorshipGroups = await MentorshipGroup.find({ teacher_id: teacherId })
            .populate({
                path: 'std_ids',
                select: 'fname lname -_id' // Select first and last name of students
            })
            .select('type group_id std_ids teacher_id');

        // Construct array with student names
        const mentorshipGroupsFormatted = mentorshipGroups.map(group => ({
            _id: group._id,
            type: group.type,
            group_id: group.group_id,
            student_names: group.std_ids.map(student => `${student.fname} ${student.lname}`),
            teacherID:group.teacher_id
        }));

        res.status(200).json(mentorshipGroupsFormatted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.myChats = async(req,res)=>{
    const teacherID = req.teacher.teacher_id;
    if(!teacherID){
        return res.status(404).json({message:"teacherID not found"});
    }

    try {
        const chats = await Conversation.find({ teacherId: teacherID });
        const chatsWithStudNames = await Promise.all(chats.map(async (item) => {
            const stud = await Student.findOne({ _id: item.studentId });
            const name = stud ? `${stud.fname} ${stud.lname}` : "Unknown";
            return { ...item._doc, studName: name };
        }));
        return res.status(200).json(chatsWithStudNames);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
