const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors")
const Joi = require('joi');

app.use(bodyParser.json());
app.use(cors())

const signinSchema = Joi.object({
  userName: Joi.string()
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

app.post('/signin', (req, res) => {
  const { error } = signinSchema.validate(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
  } else {
    console.log(req.body);
    res.status(200).json({ message: 'Signup successful' });
  }
});

app.post("/login",(req,res)=>{
  const { error } = loginSchema.validate(req.body);
  let loginStatus = false
  if (error) {

    res.status(400).json({ error: error.details[0].message ,status:loginStatus });
  } else {
    loginStatus = true
    console.log(req.body);
    res.status(200).json({ username:req.body.email,status:loginStatus });
  }
})
app.listen(8000,()=> console.log("Server is listening on port : localhost:8000"))