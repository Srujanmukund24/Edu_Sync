const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Admin = require('../models/admin')
const Teacher = require('../models/teacher')
const Batch = require('../models/batch')
const Division = require('../models/division')
const Student = require('../models/student')
const StudentSubjectInfo = require('../models/studentsubjectinfo')
const MentorshipGroup = require('../models/mentorshipGrp')
const StudentPracticalInfo = require('../models/studentpracticalinfo')
const Subject = require('../models/subject')
const Practical = require('../models/practical')

exports.removeStudent = async (req, res) => {
    try {
        const { regid } = req.params; // Use req.params instead of req.param
        // Check if the provided teacherId is valid
        if (!regid) {
            return res.status(400).json({ error: 'Student regID is required' });
        }
        // Find the teacher by _id
        const student = await Student.findOne({regid : regid});
        if (!student) {
            return res.status(404).json('Student not found');
        }
        await student.deleteOne(); // Use deleteOne() to remove the document
        res.status(200).json({ message: 'Student removed successfully' });
    } catch (error) { 
        res.status(500).json({ error: error.message });
    }
};

exports.removeTeacher = async (req, res) => {
    try {
        const { regid } = req.params; // Use req.params instead of req.param
        // Check if the provided teacherId is valid
        if (!regid) {
            return res.status(400).json({ error: 'Teacher regID is required' });
        }
        // Find the teacher by _id
        const teacher = await Teacher.findOne({regid : regid});
        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }
        await teacher.deleteOne(); // Use deleteOne() to remove the document
        res.status(200).json({ message: 'Teacher removed successfully' });
    } catch (error) { 
        res.status(500).json({ error: error.message });
    }
};

  
exports.getTeachers = async (req, res) => {
    try {
        // Fetch all teachers
        const teachers = await Teacher.find();        
        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addBatch=async(req,res)=>{
    try{
        // here the name of the bact will come from the dropdown directly 
        //and the teacher name will be from the dropdown made by get teacherroute...
        const { name, teacherID } = req.body;

        const teacher = await Teacher.findById(teacherID);
        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        const existingBatch = await Batch.findOne({ name: name });
        if (existingBatch) {
            return res.status(400).json({ error: 'Batch with this name already exists' });
        }
        const batch = new Batch({
            name: name,
            TGID: teacher._id
        });

        // Save the batch
        await batch.save();

        res.status(201).json({ message: 'Batch added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getBatches = async (req, res) => {
    try {
        // Fetch all batches
        const batches = await Batch.find({});
        res.status(200).json( batches );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addDivision = async (req, res) => {
    try {
        const { division, year, teacherId, batchIds } = req.body;

        // Find the teacher by first name and last name
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        // Find batch documents by names
        const batchDocuments = await Batch.findById({ $in: batchIds });
        if (batchDocuments.length == 0) {
            return res.status(404).json({ error: 'One or more batches not found' });
        }

        // Check if division with the same name already exists
        const existingDivision = await Division.findOne({ division: division });
        if (existingDivision) {
            return res.status(400).json({ error: 'Division with the same name already exists' });
        }

        // Create a new division
        const newDivision = new Division({
            division: division,
            year: year,
            CCID: teacherId,
            batches: batchIds
        });

        // Save the division
        await newDivision.save();

        res.status(201).json({ message: 'Division added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getDivisions = async (req, res) => {
    try {
        // Fetch all divisions and populate the associated batches and teacher
        const divisions = await Division.find();
        res.status(200).json(divisions );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStudents = async(req,res)=>{
    const students = await Student.find();
    if(!students){
        return res.status(404).json({message:"students not found"});
    }
    return res.status(200).json(students);
}

exports.loginAdmin = async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).send("Fill All Details");
    }

    const user = await Admin.findOne({email});
    console.log(user);
    if(!user) return res.status(409).send("Email Not Found");
   
    const isMatch = await bcrypt.compare(req.body.password,user.password);
    console.log(isMatch,password,user.password);
    if(!isMatch) return res.status(401).send("Invalid Password");
    try{
        const token=jwt.sign({email,admin_id:user._id},
            process.env.SECRET_KEY,
            {
                expiresIn:"1m",
            }
        )
        res.cookie("jwt",token,{httpOnly:true,secure:true,maxAge:60000})
        user.token=token;
        console.log("Login successfull")
        return res.status(200).json(user)
    }
    catch(err){
        return res.status(400).json({message:err.message});
    }

}


exports.registerAdmin = async(req,res)=>{
    
    const {username,email,password} = req.body;
   
    if(!username || !email || !password){
        return res.status(400).send("Fill complete details")
    }
    
    const user = await Admin.findOne({email})
    if(user) return res.status().send("Teacher already exists with same email")
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const newAdmin = new Admin({
            username:username,
            email:email,
            password:hashedPassword
        })
        await newAdmin.save();
       
        return res.status(200).json(newAdmin);
    }
    catch(err){
        return res.status(400).json({message:err.message});
    };

   
}


exports.addStudentSubjectInfo = async(req,res)=>{
    
    try{
        const {divisionNum,year,teacherName,subjectName} = req.body;
    
        if(!divisionNum || !year || !teacherName || !subjectName){
            return res.status(400).send("Fill complete details");
        }
        const [firstName, lastName] = teacherName.split(' ');

        const divi = await Division.findOne({division:divisionNum,year:year});
        if(!divi){
            return res.status(400).send("This division id doesnt exist in database");
        }

        const teacher = await Teacher.findOne({fname:firstName,lname:lastName});
        if(!teacher){
            return res.status(400).status("This teacher doesnt exist in database");
        }

        //added division id and subect name in teacher object
        const divisionID = divi._id;
        teacher.division.push({divID:divisionID,subject:subjectName});
        await teacher.save();

        //get list of all those students who belongs to division==division(e.g:"09") and year == year(e.g:"TE")
        const students = await Student.find({division:divisionNum,year:year});

        //iterate over each student and create subject schema for each
        const teacherID = teacher._id;
        for(const student of students){
            const subject = new StudentSubjectInfo({
                std_id:student._id,
                teacher_id:teacherID,
                subname:subjectName
            })
            await subject.save();
            console.log("subject saved for student : ",student._id);
        }
        return res.status(200).json({message:"successfully saved subjects for all students"})

    }
    catch(err){
        return res.status(400).json({message:err.message});
    }
}

exports.addMentorshipGroup = async (req, res) => {
    try {
        const { teacherName, type,studentRollNumbers,groupId } = req.body;
        const [teacherFirstName, teacherLastName] = teacherName.split(' ');
        // console.log(studentRollNumbers.type());
        // Find the teacher by first name and last name
        const teacher = await Teacher.findOne({ fname: teacherFirstName, lname: teacherLastName });
        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        const studentIds = [];
        for (const rollNumber of studentRollNumbers) {
            const student = await Student.findOne({ rollno: rollNumber });
            if (student) {
                studentIds.push(student._id);
            } else {
                // If a student is not found, return a 404 error immediately
                return res.status(404).json({ error: `Student with roll number ${rollNumber} not found` });
            }
        }

        // Check if a mentorship group with the same teacher and students already exists
        const existingGroup = await MentorshipGroup.findOne({
            teacher_id: teacher._id,
            std_ids: { $all: studentIds },
            type: type,
            group_id:groupId
        });

        if (existingGroup) {
            return res.status(400).json({ error: 'Duplicate mentorship group found' });
        }

        // Create a new mentorship group
        const newMentorshipGroup = new MentorshipGroup({
            teacher_id: teacher._id,
            std_ids: studentIds,
            type: type,
            group_id:groupId
        });

        // Save the mentorship group
        await newMentorshipGroup.save();

        res.status(201).json({ message: 'Mentorship group added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMentorshipGroups = async (req, res) => {
    try {
        // Fetch all mentorship groups and populate teacher and student fields with names
        const mentorshipGroups = await MentorshipGroup.find({})
            .populate({
                path: 'teacher_id',
                select: 'fname lname -_id' // Select first and last name of teacher
            })
            .populate({
                path: 'std_ids',
                select: 'fname lname -_id' // Select first and last name of students
            });

        res.status(200).json(mentorshipGroups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCurrentAdmin=async(req,res)=>{
    try{
        const admin=await Admin.findById(req.admin.admin_id);
        if(!admin){
            return res.status(400).json("No teacher found")
        }
        return res.status(200).json(admin);
    }catch(error){
        res.status(500).json({error:error.message});
    }
}
exports.addStudentPracticalInfo = async(req,res)=>{
    try{
        const {batchID,teacherID,pracSubName} = req.body;
        const batch = await Batch.findOne({_id:batchID});
        const teacher = await Teacher.findOne({_id:teacherID});
        if(!batch){
            return res.status(404).json({message:"batch doesn't exist"});
        }
        if(!teacher){
            return res.status(404).json({message:"teacher doesn't exist"});
        }
        if(!pracSubName){
            return res.status(400).json({message:"subject name required"});
        }
        teacher.batch.push({batchID:batchID,subject:pracSubName});
        await teacher.save();

        const students = await Student.find({batch:batch.name});
        for(const student of students){
            const newObj = new StudentPracticalInfo({
                std_id:student._id,
                teacher_id:teacherID,
                pracsubname:pracSubName
            })
            await newObj.save();
        }
        return res.status(200).json({message:"Practicals added successfully"}); 
    }
    catch(err){
        return res.status(400).json({message:err.message})
    }
}


exports.addSubject = async(req,res)=>{
    try{
        const {subjectName,year} = req.body;
        if(!subjectName || !year){
            return res.status(400).json({message:"Enter all fields"});
        }
        const subject = await Subject.findOne({subjectName:subjectName});
        if(subject){
            return res.status(400).json({message:"Subject Name already exists"});
        }
        const newSubject = new Subject({
            subjectName:subjectName,
            year:year
        })
        await newSubject.save();
        return res.status(200).json(newSubject);
        
    }
    catch(err){
        return res.status(400).json({message:err.message});
    }

}
exports.addPractical = async(req,res)=>{
    try{
        const {practicalName,year} = req.body;
        if(!practicalName || !year){
            return res.status(400).json({message:"Enter all fields"});
        }
        const practical = await Subject.findOne({practicalName:practicalName});
        if(practical){
            return res.status(400).json({message:"Practical Name already exists"});
        }
        const newPractical = new Practical({
            practicalName:practicalName,
            year:year
        })
        await newPractical.save();
        return res.status(200).json(newPractical);
    }catch(err){
        return res.status(400).json({message:err.message});
    }
    
}



