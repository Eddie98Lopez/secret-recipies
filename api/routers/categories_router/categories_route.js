const router = require('express').Router()
const {getCats} = require('../../models/index')

router.get('/', async(req,res)=>{
    try{
        const categories = await getCats()
        res.status(200).json(categories)
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports= router