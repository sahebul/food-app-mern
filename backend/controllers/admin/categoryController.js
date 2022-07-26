const expressAsyncHandler = require("express-async-handler");
const Category = require("../../models/admin/Category");

const allCategories=expressAsyncHandler(async(req,res)=>{
    
    try{
            const categories= await Category.find({});
            res.status(201);
            res.json(categories)
    }catch(error){
        res.status(400);
        throw new Error(error.message);
    }
})

const addCategory=expressAsyncHandler(async(req,res)=>{
            const {name}=req.body
            if(!name){
                res.status(400);
                throw new Error("Catgeory name is required")
                return;
            }

            try{
                    const new_cat= await Category.create(req.body);
                    res.status(201);
                    res.json(new_cat)
            }catch(error){
                res.status(400);
                throw new Error(error.message);
            }

})
const edit=expressAsyncHandler(async(req,res)=>{
        const {name,description,id}=req.body
        if(name && id){
            const updatedCategory= await Category.findByIdAndUpdate(id,
                {name,description},
                {
                    new:true //return the updated records
                })

                if(!updatedCategory){
                    res.status(400);
                    throw new Error("Unable to update category. Please try again.")
                    }else{
                            res.send(updatedCategory);
                    }
        }
})

const deleteCat=expressAsyncHandler(async(req,res)=>{
      const  {catId} =req.params;
      if(catId){
          const result=await Category.findByIdAndDelete(catId)
          if(!result){
            res.status(400);
            throw new Error("Unable to delete category. Please try again.")
            }else{
                    res.send(res);
            }
      }
})
module.exports={
    allCategories,addCategory,edit,deleteCat
}