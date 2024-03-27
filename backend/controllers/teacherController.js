const Teacher = require('../models/teacher')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
    if(!user) return res.status(409).send("Student Does not exist");

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) return res.status(401).send("Invalid Password");
    try{
        const token = jwt.sign({email},process.env.SECRET_KEY,
            {
                expiresIn:'1m',
            }
        )
        res.cookie("jwt",token,{httpOnly:true,secure:true,maxAge:60000});
        user.token = token;
        console.log(user);
        return res.status(200).json({user})

    }
    catch(err){
        return res.status(400).json({message:err.message});
    }
}
