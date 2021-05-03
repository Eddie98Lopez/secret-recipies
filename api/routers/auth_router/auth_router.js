const router = require('express').Router()
const bcrypt = require('bcryptjs')
const {addUser} = require("./users_model")
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../../../secret')
const { validateRegInfo, usernameFree, userExists } = require('./auth_middleware')

router.post("/register", validateRegInfo, usernameFree, async(req,res)=>{
    const {username, password, email, name} = req.body

    const hash = bcrypt.hashSync(password, 10)
    const newUser = {
         user_username:username,
         user_password:hash,
         user_name: name,
         user_email: email
        }

    try{
        const user = await addUser(newUser)
        res.status(201).json(user)
    }

    catch(err){
        res.status(500).json({message:err.message})
    }
})

router.post("/login", userExists, async(req,res)=>{
    
    const hash = req.user.user_password
    const {password} = req.body
    
try{
    if(req.user && bcrypt.compareSync(password,hash)===true){
        const token = generateToken(req.user)
        const user = {
            id: req.user.user_id,
            username: req.user.user_username,
            name:req.user.user_name
        }
        res.status(200).json({token:token, message: `welcome back ${req.user.user_username}`,user})
    }
    else{
        res.status(403).json({message:'invalid credentials'})
    }
}
catch(err){
    res.status(500).json({message:err.message})
}
})




//generate Token

const generateToken = (user) =>{
    const payload = {
        subject: user.user_id,
        username: user.user_username
    }
    const options = { 
        expiresIn: '1d'
    }

    return jwt.sign(payload,JWT_SECRET,options)
}

module.exports = router