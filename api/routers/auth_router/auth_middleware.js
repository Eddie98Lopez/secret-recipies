const db = require('../../data/db-config')

//Middleware for registration validation to check if a username is already taken 
const usernameFree = async (req,res,next) => {
    const taken = await db('users').where({username:req.body.username})
    if(!taken){
        next()
    }
    else{
        res.status(400).json({message:"please choose a different username"})
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
    const user = await db('users').where({username: req.body.username})

    if(user){
        req.user = user
        next()
    }
    else{
        res.status(403).json({message: "invalid credentials"})
    }

}






module.exports = {usernameFree, validateRegInfo, userExists}