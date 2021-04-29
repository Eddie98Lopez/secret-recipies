

const checkAllFields = (req,res,next)=>{

    const {recipe_title, recipe_source, recipe_instructions, category_id, user_id,ingredients} = req.body
    if (!recipe_title || !recipe_source || !recipe_instructions || !category_id || !user_id || !ingredients || ingredients.length === 0){
        res.status(400).json('all fields are required')
    }

    else{
        req.recipe = {recipe_title,recipe_source,recipe_instructions,category_id,user_id}
        req.ingredients = ingredients
        next()
    }
    
}






module.exports = {checkAllFields}