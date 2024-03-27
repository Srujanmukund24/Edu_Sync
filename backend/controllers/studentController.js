const Student = require("../models/student")
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken')

exports.registerStudent = async(req,res)=>{
    const {regid,fname,lname,email,mobile,division,year,rollno,batch,password} = req.body;
    
    if(!regid || !fname || !lname || !email || !mobile || !division || !year || !rollno || !batch ||!password){
        return res.status(400).send("Fill complete details")
    }

    const user = await Student.findOne({email:email});
    if(user) return res.status(409).send("Student already exists");

    try{
        // const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        const newStudent = new Student({
            regid:regid,
            fname:fname,
            lname:lname,
            email:email,
            mobile:mobile,
            division:division,
            year:year,
            rollno:rollno,
            batch:batch,
            password:hashedPassword
        })
        await newStudent.save();
        return res.status(201).json(newStudent);
    }
    catch(err){
        return res.status(400).json({message : err.message});
    }
}

exports.loginStudent = async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).send("Fill All Details");
    }

    const user = await Student.findOne({email});
    console.log(user);
    if(!user) return res.status(409).send("Student Does not exist");
   
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