const User = require("../models/user-model")
const bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');


const home =  async(req, res)=> {
  try{
    res
    .status(200)
    .send("Welcome to the router page ")
  }catch(err){
    console.log(err)
  }
}

//this is the logic behind the registeration 


const register = async(req, res) => {
  try{
    console.log(req.body)
    
const { username , email, phone, password } = req.body;

const userExist =  await User.findOne({email})


if(userExist) {

  return res.status(400).json({ msg: "email already exist"})
}
//hash the password 
// const saltRound = 10;
// const hash_password = await bcrypt.hash(password, saltRound)



 const userCreated = await User.create({
  username ,
     email,
   phone,
   password})

    res
    .status(201)
    .json({ msg: userCreated, 
      token: await userCreated.generateToken(),

       userId: userCreated._id.toString(),
    })

  }
  catch(error){
    console.error(error)
res.status(500).json(" Internal server ereror ")
  }
}


// / ___user login logic 

const login = async (req, res) => {
try{
  const { email , password } = req.body
const userExist = await User.findOne({ email })
console.log(userExist)


if(!userExist) {
  return res.status(400).json({message: "Invalide Credentials"})
}


const user = await bcrypt.compare(password, userExist.password)
// const user = await userExist.comparePassword(password)


if(user) {
  const token = await userExist.generateToken();
  res
  .status(200)
  .json({ msg: "Login Successful", 
    token: await userExist.generateToken(),

     userId: userExist._id.toString(),
  })
}
else{
  res.status(401).json({ message:"Invalid email or password "})
}


}catch(error){
res.status(500).json("Internal server error ")

}

}




module.exports= {home, register , login}
