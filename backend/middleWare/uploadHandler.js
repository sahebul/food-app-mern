
const expressAsyncHandler = require("express-async-handler");
const multer=require("multer");

var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, './uploads');    
    }, 
    filename: function (req, file, cb) { 
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
       cb(null , uniqueSuffix+'-'+file.originalname);   
    }
 });
  
  var upload = multer({ storage: storage }).single("prod_image");

const doUpload=expressAsyncHandler(async(req,res,next)=>{
    upload(req,res,(err)=>{
        if(err){
            res.status(400);
            throw new Error("Unable to upload the image");
        }
        // req.file=req.file
        next();
    })
})
module.exports={doUpload}
