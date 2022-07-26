const expressAsyncHandler = require('express-async-handler');
const jwt=require('jsonwebtoken');
const AdminUser=require('../models/admin/Users');
const Users = require('../models/Users');

const adminAuth=expressAsyncHandler(async(req,res,next)=>{

    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token=req.headers.authorization.split(" ")[1];
            const decToken=jwt.verify(token,process.env.JWT_SECRET);
            req.adminUser=await AdminUser.findById(decToken.user.id).select('-password')
            next();
        }catch(er){
            res.status(401);
            throw new Error("Unauthorized")
        }
    }

    if(!token){
        res.status(401);
        throw new Error("Unauthorized")
    }
})


const auth=expressAsyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
                    token=req.headers.authorization.split(" ")[1];
                    const decToken=jwt.verify(token,process.env.JWT_SECRET);
                    console.log(decToken);
                    req.user=await Users.findById(decToken.user).select('-password')
                    next();
        }catch(erreor){
            res.status(401);
            throw new Error("Unauthorized")
        }
    }
})

module.exports={adminAuth,auth}