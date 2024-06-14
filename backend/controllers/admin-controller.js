const User = require("../models/user-model")
const Contact = require("../models/contact-model")

const getAllusers =async (req,res) =>{

  try {
    const users = await User.find().select("-password")
    console.log(users)
    if(!users || users.length === 0){
return     res.status(404).json({message :"No Users Found"})
    }
   return  res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}

const getAllContacts =async (req,res) =>{
  try {
    const contacts = await Contact.find()
    console.log(contacts)
    if(!contacts || contacts.length === 0){
return     res.status(404).json({message :"No Contacts Found"})
    }
    res.status(200).json(contacts)
  } catch (error) {
    next(error)
  }
}

module.exports= {getAllusers,getAllContacts}