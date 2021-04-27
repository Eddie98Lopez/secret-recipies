const router = require('express').Router()
const bcrypt = require('bcryptjs')
const {addUser} = require("./model")
const jwt = require('jsonwebtoken')
const secret = require('../../../secret')
const { validateRegInfo, usernameFree, userExists } = require('./auth_middleware')

router.post("/register", validateRegInfo, usernameFree, async(req,res)=>{
    const {username, password, phone, name} = req.body

    const hash = bcrypt.hashSync(password, 10)
    const newUser = {
         user_username:username,
         user_password:hash,
         user_name: name,
         user_phone: phone
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
    const {user} = req
    const{password} = req.body
try{
    if(user && bcrypt.compareSync(password, user.password)){
        const token = generateToken(user)
        res.status(200).json({token, message: `welcome back ${user.user_username}`})
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

    return jwt.sign(payload,secret,options)
}

module.exports = router