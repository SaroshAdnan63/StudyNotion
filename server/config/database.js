const mongoose=require("mongoose");
require('dotenv').config();

const connectWithDb=()=>{
    mongoose.connect(process.env.MONGODB_URL,{

    })
    .then(()=>{console.log("Database connected successfully")})
    .catch((error)=>{
        console.log("Database connection Failed");
        console.error(error);
        process.exit(1);
    })
}
module.exports=connectWithDb;