const expressAsyncHandler = require("express-async-handler");
const { generateToken } = require("../../config/helper");
const AdminUser = require("../../models/admin/Users");

const adminLogin=expressAsyncHandler( async(req,res)=>{
        const {email,password}=req.body;
        if(!email || !password){
                res.status(400);
                throw new Error("Please enter email & password");
        }
        const user=await AdminUser.findOne({email});
       
        if(user && ( await user.matchPassword(password)) ){
                const data ={
                        _id:user._id,
                        name:user.name,
                        email:user.email,
                        token:generateToken({id:user._id,user_type:'admin'})
                }
                // console.log(data);
               res.status(201).json(data)
        }else{
                res.status(400);
                throw new Error("Invalid Credentials");
        }
})
const createAdminUser=async(req,res)=>{
        var new_admin= new AdminUser({
                name:"sahebul",
                email:"sahebul99@gmail.com",
                password:"admin"
        })
        //save user
        new_admin.save(function(err){
                if(err)  throw err;
                

                //fetch user 
                AdminUser.findOne({email:'sahebul99@gmail.com'},function(err,user){
                        if(err)  throw err;
                        user.comparePassword('admin',function(err,isMatch){
                                if(err)  throw err;
                                console.log('admin : ',isMatch)
                        })

                        //testing wrong password
                        user.comparePassword('admin1',function(err,isMatch){
                                if(err)  throw err;
                                console.log('admin1 : ',isMatch)
                        })
                })
        })
}
module.exports={adminLogin,createAdminUser}