const expressAsyncHandler = require("express-async-handler");
const Orders = require("../models/Orders");

const placeOrder=expressAsyncHandler(async(req,res)=>{
        const {products,d_add,total}=req.body;
        if(!products || !d_add || !total){
            res.status(400);
            throw new Error("All fields are required");
        }
       // console.log(products);
        try{

            let prods = JSON.parse(products);
            let x = Math.random() * 10000000;
            let d=new Date();
            let mon=d.getMonth() < 9 ?  "0"+d.getMonth()+1 : d.getMonth()+1;
            let orderid=d.getDate()+mon+d.getFullYear()+Math.round(x);
            const order = await Orders.create({
                products:prods,
                user:req.user._id, //logged user id
                d_add:d_add,
                total:total,
                orderid:orderid

            })
            res.status(201).json(order);
        }catch(error){
            res.status(400);
            throw new Error(error.message);
        }
})

const myOrders=expressAsyncHandler(async(req,res)=>{
        try{
            const myorders=await Orders.find({user:req.user._id})
            .populate('products').populate('d_add')
            res.status(201).json(myorders);
        }catch(error){
            res.status(400);
            throw new Error(error.message);
        }
})
module.exports={placeOrder,myOrders}