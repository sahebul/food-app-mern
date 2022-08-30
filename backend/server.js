const express = require('express');
const mongoConnect=require('./config/db');
const dotenv=require('dotenv');
const adminRoute=require('./routes/admin/userRoute');
const userRoute=require('./routes/userRoutes');
const orderRoute=require('./routes/orderRoutes');
const adminProductRoute=require('./routes/admin/productRoute');
const {notFound,errorHandler} =require('./middleWare/errorHandler');
const adminCatgeoryRoute = require('./routes/admin/categoryRoute');
const adminOrderRoute = require('./routes/admin/orderRoute')
const app = express();
dotenv.config();
mongoConnect();
app.use(express.json());

const __dirname1= path.resolve();
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname1,"/frontend/build")))
    app.get("*",(req,res)=>{
      res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"))
    })
}else{
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}


app.use(express.static('uploads'));
app.use('/images', express.static('uploads'));

//admin routes
app.use('/api/admin/user',adminRoute)
app.use('/api/admin/category',adminCatgeoryRoute)
app.use('/api/admin/product',adminProductRoute)

app.use('/api/admin/orders',adminOrderRoute)
// end of admin routes


//frontend routes
app.use('/api/user',userRoute)
app.use('/api/order',orderRoute)

//end of frontend routes
app.use(notFound);
app.use(errorHandler);

app.set( 'port', ( process.env.PORT || 5000 ));
const PORT = process.env.PORT || 5000;
 app.listen( app.get( 'port' ), function() {
  console.log( 'Node server is running on port ' + app.get( 'port' ));
  });
