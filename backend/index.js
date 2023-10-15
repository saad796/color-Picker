const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require("mongoose")
const userModel = require("./DbSchema/userSchema")
const cors = require("cors")
const Joi = require('joi');

async function connectDB()
{
  await mongoose.connect("mongodb://127.0.0.1:27017/serviceWebDB")
  console.log("Connected to db");
}
connectDB()

app.use(bodyParser.json());
app.use(cors())

async function addUserToDb(userData) {
  const user = new userModel({
    username : userData.username,
    email : userData.email,
    password : userData.password
  });
  const saveUser = await user.save()
  if(saveUser === user)
  {
    console.log(user);
    return {status : true , id:user.id}
  }
  else
  {
    return {status : false ,id : null}
  }
  
}

async function checkUser(userData) {
  const foundRecord = await userModel.findOne({email : userData.email});
  let status = false;
  if(foundRecord)
  {
    if(foundRecord.password === userData.password)
    {
      status = true;
      return {status:status,message : "Found user",username:foundRecord.username,id:foundRecord._id}
    }
    else
    {
      return {status:status,message : "Incorrect password"}
    }
  }
  else
  {
    return {status:status,message : "could not find User"}
  }
}

async function addColorToDb(color,id)
{
  const foundRecord = await userModel.findOne({_id : id});
  if(foundRecord)
  {
    const colorArr = foundRecord.favColor
    colorArr.push(color);
    const resp = await userModel.findOneAndUpdate({_id : id},{favColor:colorArr})
    return true
  }
  else
  {
    return false
  }
}


const signinSchema = Joi.object({
  username: Joi.string()
    .min(2)
    .max(50)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(5)
    .max(17)
    .pattern(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/,
      'Password must contain at least one numeric character and one special symbol'
    )
    .required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(5)
    .max(17)
    .pattern(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/,
      'Password Invalid'
    )
    .required(),
});

//Post Routes



app.post('/signin', async(req, res) => {
  const { error } = signinSchema.validate(req.body);
  let signinStatus = false
  if (error) {
    res.status(400).json({ error: error.details[0].message,status:signinStatus});
  } else {
    const statusOfAddition = await addUserToDb(req.body);
    if(statusOfAddition.status)
    {
      signinStatus = true;
      res.status(200).json({ message: 'Signup successful',username:req.body.username,status:signinStatus,id:statusOfAddition.id});
    }
    else
    {
      res.status(500).json({ message: 'Server Error. Signup not Successfull.please try again',status:signinStatus});
    }
  }
});

app.post("/login",async (req,res)=>{
  const { error } = loginSchema.validate(req.body);
  let loginStatus = false

  
  if (error) {
    res.status(400).json({ error: error.details[0].message ,status:loginStatus });
  } else {
    const userCheck = await checkUser(req.body);
    if(userCheck.status)
    {
      loginStatus = true
      res.status(200).json({ username: userCheck.username,status:loginStatus,id:userCheck.id});
    }
    else
    {
      res.status(400).json({error:userCheck.message})
    }
  }
})

app.post("/addColor",async(req,res)=>{
  const {id,color} = req.body;
  if(id)
  {
    const statusOfAddition = await addColorToDb(color , id);
    res.status(200).json({status:statusOfAddition })
  }
  else
  {
    res.status(400).json({status:false , error:"Please login for adding pallete" })
  }
})

app.listen(8000,()=> console.log("Server is listening on port : localhost:8000"))