

const checkAllFields = (req,res,next)=>{

    const {recipe_title, recipe_source, recipe_instructions, category_id, user_id, ingredients} = req.body
    if (!recipe_title || !recipe_source || !recipe_instructions || !category_id || !user_id || !ingredients){
        res.status(400).json('all fields are required')
    }

    else{
        req.recipe = {recipe_title,recipe_source,recipe_instructions,category_id,user_id}
        req.ingredients = ingredients
        console.log(req.recipe)
        console.log(req.ingredients)
        console.log('it passed validation')
        next()
    }
    
}






module.exports = {checkAllFields}