const expressAsyncHandler = require("express-async-handler");
const Products = require("../../models/admin/Products");
const list=expressAsyncHandler(async(req,res)=>{

    const searchTerm=req.query.search ? {
                $or:[
                    {name:{$regex:req.query.search,$options:"i"}}
                ]
    }:{}
        try{
            const result=await Products.find(searchTerm).populate('category');
            res.status(201);
            res.json(result);
        }catch(error){
            res.status(400);
            throw new Error(error.message);
        }
})
const add=expressAsyncHandler(async(req,res)=>{
        const {name,price,soldas,sdescription}=req.body;
        //console.log(req.body.name);
        if(!name || !price || !soldas || !sdescription){
            res.status(400);
            throw new Error("All field are required");
        }
        try{
            const prod=await Products.create({
                name:name,
                price:price,
                soldas:soldas,
                sdescription:sdescription,
                description:req.body.description,
                category:req.body.category,
                image:req.file ? req.file.filename : null

            });
            res.status(201);
            res.json(prod);
        }catch(error){
                res.status(400);
                throw new Error(error.message);
        }
})
const edit=expressAsyncHandler(async(req,res)=>{
    const {name,price,soldas,sdescription,id}=req.body;
    try{
        // const prod=await Products.findByIdAndUpdate(id,{name,price,soldas,sdescription},{new:true})
        const new_data={
            name:name,
            price:price,
            soldas:soldas,
            sdescription:sdescription,
            description:req.body.description ?? null,
            category:req.body.category,
        }
        if(req.file){
            new_data.image=req.file.filename;
        }
        const prod=await Products.findByIdAndUpdate(id,new_data,{new:true})
        res.status(201);
        res.json(prod);
    }catch(error){
            res.status(400);
            throw new Error(error.message);
    }
})
const del=expressAsyncHandler(async(req,res)=>{
        const {id}=req.params;
        if(id){
            try{
                const prod=await Products.findByIdAndDelete(id)
                res.status(201);
                res.json(prod);
            }catch(error){
                    res.status(400);
                    throw new Error(error.message);
            }
        }
})

const productByCategory=expressAsyncHandler(async(req,res)=>{
    const {id}=req.params;
    if(id){
        try{
             const prod=await Products.find({category:id}).populate('category')
             res.status(201).json(prod)
        }catch(error){
            res.status(400);
            throw new Error(error.message);
        }
    }
})

module.exports={
    list,add,edit,del,productByCategory
}