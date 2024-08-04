const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Teacher = require('../models/teacher');
const Student = require('../models/student');
const config = process.env;

exports.authorizeAdmin = async(req,res,next)=>{
    const token = req.cookies.jwt;

    if(!token){
        return res.status(403).send("token is required for authentication")
    }
    try{
        const decoded = jwt.verify(token,config.SECRET_KEY);
        const tempEmail = decoded.email;
        const isAdmin = await Admin.findOne({email:tempEmail});
        if(!isAdmin){
            return res.status(401).send("Only admin can access");
        }
        req.admin = decoded;
    }
    catch(err){
        return res.status(401).send("Invalid token");
    }
    return next();
}

exports.authorizeTeacher = async(req,res,next)=>{
    const token = req.cookies.jwt;

    if(!token){
        return res.status(403).send("token is required for authentication")
    }
    try{
        const decoded = jwt.verify(token,config.SECRET_KEY);
        const tempEmail = decoded.email;
        const isTeacher = await Teacher.findOne({email:tempEmail});
        if(!isTeacher){
            return res.status(401).send("Only valid Teacher can access");
        }
        req.teacher = decoded;
    }
    catch(err){
        return res.status(401).send("Invalid token");
    }
    return next();
}

exports.authorizeStudent = async(req,res,next)=>{
    const token = req.cookies.jwt;

    if(!token){
        return res.status(403).send("token is required for authentication")
    }
    try{
        const decoded = jwt.verify(token,config.SECRET_KEY);
        const tempEmail = decoded.email;
        const isStudent = await Student.findOne({email:tempEmail});
        if(!isStudent){
            return res.status(401).send("Only valid Student can access");
        }
        req.student = decoded;
    }
    catch(err){
        return res.status(401).send("Invalid token");
    }
    return next();
}