const expressAsyncHandler = require("express-async-handler");
const Users = require("../models/Users");
const {generateToken} =require('../config/helper');
const Address = require("../models/Address");
const signup=expressAsyncHandler(async(req,res)=>{
       
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            res.status(400);
            throw new Error("All fields are required");
        }

        const isExits= await Users.findOne({email});
        if(isExits){
            res.status(400);
            throw new Error("User already exits");
        }

        try{
                const user= await Users.create(req.body);
                res.status(201);
                res.json({
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    mobile:user.modile,
                    token:generateToken(user._id)
                });
        }catch(error){
            res.status(400);
            throw new Error(error.message);
        }
})
const login=expressAsyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if( !email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }
    try{
            const user = await Users.findOne({email});
            if(user && (await user.matchPassword(password))){
                    res.status(201).json({
                        _id:user._id,
                        name:user.name,
                        email:user.email,
                        mobile:user.modile,
                        token:generateToken(user._id)
                    })
            }else{
                res.status(400);
                throw new Error("Invalid Credentials");
            }
    }catch(error){
            res.status(400);
            throw new Error(error.message);
        }
})

const addAddress=expressAsyncHandler(async(req,res)=>{
               const {name,phone,address1,pin,city} =req.body;
               if(!name || !phone || !address1 || !pin || !city){
                res.status(400);
                throw new Error("All fields are required");
               }

               try{
                    const add=await Address.create({
                        name:name,
                        phone:phone,
                        address1:address1,
                        address2:req.body.address2,
                        pin:pin,
                        city:city,
                        user:req.user._id //logged user id
                    })
                    res.status(201).json(add);
               }catch(error){
                res.status(400);
                throw new Error(error.message);
               }
})
const getAddress=expressAsyncHandler(async(req,res)=>{
            try{
                    const add= await Address.find({user:req.user._id}).sort({_id:-1})
                    res.status(201).json(add);
            }catch(error){
                res.status(400);
                throw new Error(error.message);
            }        
})  

const editAddress=expressAsyncHandler(async(req,res)=>{
      const { id}=req.body;
      if(!id){
        res.status(400);
        throw new Error("No Address found");
      }
    try{
            const updatedAdd= await Address.findByIdAndUpdate(id,{
                name:req.body.name,
                phone:req.body.phone,
                address1:req.body.address1,
                address2:req.body.address2,
                pin:req.body.pin,
                city:req.body.city,
            },{
                new:true
            })
            res.status(201).json(updatedAdd);
    }catch(error){
        res.status(400);
        throw new Error(error.message);
    }
})
module.exports={signup,login,addAddress,getAddress,editAddress};