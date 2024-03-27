const jwt = require('jsonwebtoken')
const Admin = require('../models/admin')
const bcrypt = require('bcrypt')
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