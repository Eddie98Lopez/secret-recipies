const router = require('express').Router()
const {getUnits} = require('../../models/index')

router.get('/',async(req,res,)=>{
    try{
        const units = await getUnits()
        res.status(200).json(units)
    }
    catch(err){
        res.status(500).json(err)
    }

})

module.exports = router