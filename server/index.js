const express=require("express");
const app=express();
require('dotenv').config();
const PORT=process.env.PORT||4000;
app.use(express.json());


const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const cookieparser=require("cookie-parser");
const cors=require("cors")
const{cloudinaryConnect}=require("./config/cloudinary");
const fileUpload=require('express-fileupload');

const connectWithDb=require("./config/database");
connectWithDb();

require("dotenv").config();
app.use(cookieparser());
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true,
    })
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)
cloudinaryConnect();

//routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payments",paymentRoutes);



app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your sever is Up and Running"
    })
});

app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`)
})