const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Admin = require('../models/admin')
const Teacher = require('../models/teacher')
const Batch = require('../models/batch')
const Division = require('../models/division')
const Student = require('../models/student')
const Subject = require('../models/subject')
const MentorshipGroup = require('../models/mentorshipGrp')


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
        const { name, teacherName } = req.body;
        const [firstName, lastName] = teacherName.split(' ');

        const teacher = await Teacher.findOne({ fname: firstName, lname: lastName });
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
        const batches = await Batch.find({}, 'name TGID').populate('TGID', 'fname lname');
        // The populate method is used to replace the TGID field with the actual teacher document

        res.status(200).json( batches );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.addDivision = async (req, res) => {
    try {
        const { division, year, teacherName, batchNames } = req.body;
        const [firstName, lastName] = teacherName.split(' ');

        // Find the teacher by first name and last name
        const teacher = await Teacher.findOne({ fname: firstName, lname: lastName });
        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        // Append division name to batch names for uniqueness check
        const uniqueBatchNames = batchNames.map(name => `${name}${division}`);

        // Find batch documents by names
        const batchDocuments = await Batch.find({ name: { $in: uniqueBatchNames } });
        if (batchDocuments.length !== uniqueBatchNames.length) {
            return res.status(404).json({ error: 'One or more batches not found' });
        }

        // Check if division with the same name already exists
        const existingDivision = await Division.findOne({ division: division });
        if (existingDivision) {
            return res.status(400).json({ error: 'Division with the same name already exists' });
        }

        // Extract batch IDs from batch documents
        const batchIds = batchDocuments.map(batch => batch._id);

        // Create a new division
        const newDivision = new Division({
            division: division,
            year: year,
            CCID: teacher._id,
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
        const divisions = await Division.find({})
            .populate({
                path: 'batches',
                select: 'name -_id' // Select only the name field from batches
            })
            .populate({
                path: 'CCID',
                select: 'fname lname -_id' // Select first and last name of teacher
            });

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
        const token=jwt.sign({email},
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


exports.addSubject = async(req,res)=>{
    
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
            const subject = new Subject({
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




