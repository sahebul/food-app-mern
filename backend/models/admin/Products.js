const mongoose=require('mongoose');
const prodSchemea=mongoose.Schema({
        name:{type:String,require:true},
        sdescription:{type:String,require:true},
        description:{type:String},
        soldas:{type:String,require:true},
        price:{type:Number,require:true},
        image:{type:String},
        category:
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"categories"
            }
        
},{
    timestamps:true
})

const Products=mongoose.model('products',prodSchemea);
module.exports=Products