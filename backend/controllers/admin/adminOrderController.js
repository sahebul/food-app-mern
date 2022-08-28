const expressAsyncHandler = require("express-async-handler");

const Orders=require('../../models/Orders');
const list=expressAsyncHandler(async(req,res)=>{
    try{
        const result=await Orders.find({}).populate('user','-password').populate('d_add');
        res.status(201)
        res.json(result);
    }catch(error){
        res.status(400)
        throw new Error(error.message)
    }
})

const updatestatus=expressAsyncHandler(async(req,res)=>{
    const {id,status}=req.body;
    try{
        const result=await Orders.findByIdAndUpdate(id,{status},{new:true})
        res.status(201)
        res.json(result);
    }catch(error){
        res.status(400)
        throw new Error(error.message)
    }
})
module.exports={list,updatestatus}