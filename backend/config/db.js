const mongoose=require('mongoose');
const mongoConnect=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_CONFIG,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })

        console.log("mongo db connected::"+conn.connection.host);

    }catch(error){
        console.log("mongo connection error"+error.message);
        process.exit();
    }

}
module.exports=mongoConnect;