//const db = require('../../data/db-config')
const {getByFilter} = require('./users_model')

//Middleware for registration validation to check if a username is already taken 
const usernameFree = async (req,res,next) => {
   const user = await getByFilter({user_username: req.body.username})
   if(!user){
       next()
   }
   else{
       res.status(400).json({message:"please choose different username"})
   }
}

//validates registration info
const validateRegInfo = (req,res,next) => {
    const {username,password,phone,name} = req.body

    if(!username || !password || !phone || !name){
        res.status(400).json({message: "all fields are required"})
    }
    else{
        next()
    }
}

//checks if the user exists for login
const userExists = async (req,res,next) => {
    const user = await getByFilter({user_username:req.body.username})
   try{
    //console.log(user)

    if(user){
        req.user = user
        next()
    }
    else{
        res.status(403).json({message: "invalid credentials"})
    }
   }
   catch(err){
       res.status(500).json('something happened')
   }

}






module.exports = {usernameFree, validateRegInfo, userExists}