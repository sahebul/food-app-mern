const mongoose=require('mongoose');
const addSchemea=mongoose.Schema({
        name:{type:String,require:true},
        phone:{type:String,require:true},
        address1:{type:String,require:true},
        address2:{type:String,},
        pin:{type:Number,require:true},
        city:{type:String,require:true},
        user:
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Users"
            }
        
},{
    timestamps:true
})

const Address=mongoose.model('Address',addSchemea);
module.exports=Address