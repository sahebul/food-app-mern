const mongoose=require('mongoose')

const categorySchema=mongoose.Schema({
    name:{type:String,require:true},
    description:{type:String}
},{
    timestamps:true
})

const Category=mongoose.model('categories',categorySchema);
module.exports=Category;