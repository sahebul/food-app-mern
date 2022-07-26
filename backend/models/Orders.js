const mongoose=require('mongoose');
const orderSchmea=mongoose.Schema({
        user:{type:mongoose.Schema.Types.ObjectId,ref:"Users"},
        // products:[{type:mongoose.Schema.Types.ObjectId,ref:"products"}],
        products:[{type:mongoose.Schema.Types.Mixed ,require:true}],
        d_add:{type:mongoose.Schema.Types.ObjectId,ref:"Address"},
        total:{type:Number,require:true},
        orderid:{type:String},
        status:{type:String,default:"Pending"}
},{
    timestamps:true
})

const Orders=mongoose.model('Orders',orderSchmea);
module.exports=Orders;