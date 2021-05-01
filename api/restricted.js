const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../secret')

const restricted = (req,res,next) =>{

    const token = req.headers.authorization

    if(!token){
        res.status(403).json('token is required')
    }
    else{
        jwt.verify(token,JWT_SECRET,(err,decoded)=>{
            if(err){
                res.status(400).json('token invalid')
            }
            else{
                req.decoded = decoded
                next()
            }
        })
    }

}

module.exports = restricted