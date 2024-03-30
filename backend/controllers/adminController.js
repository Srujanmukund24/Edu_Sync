const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Admin = require('../models/admin')
const Division = require('../models/division')
const Teacher = require('../models/teacher')
const Student = require('../models/student')
const Subject = require('../models/subject')

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
        return res.status(200).json({user})
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
    }
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