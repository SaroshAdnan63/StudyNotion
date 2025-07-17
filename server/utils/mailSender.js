const nodemailer=require('nodemailer');
require('dotenv').config();

const mailSender=async(email,title,body)=>{
  try{
  let transporter=nodemailer.createTransport({
    service: "gmail",
    
    auth:{
        user:process.env.MAIL_HOST,
        pass:process.env.MAIL_PASS,
    }
  })

  let info=await transporter.sendMail({
    from:'StudyNotion || Codehelp',
    to:`${email}`,
    subject:`${title}`,
    html:`${body}`,
  })
  console.log(info);
  return info;
  }
  catch(error){
  console.log(error.message);
  }
}
module.exports=mailSender;