const db = require('../data/db-config')

const getRecipeBF = (filter) => {
    return db('recipes').where(filter).first()
}

const getRecipes = (userId) =>{
    return db('recipes').where('user_id',userId)
}

const getRecipeById = (id) => {
    return db('recipes').where('recipe_id',id).first()
}

const addRecipe = async (newData) =>{
    const [id]= await db('recipes').insert(newData).returning('recipe_id')
    return db('recipes').where('recipe_id',id).first()
}

const updateRecipe = async (id,recipeChanges) => {
  await db('recipes').where('recipe_id', id ).update(recipeChanges)
    const updated = await getRecipeById(id)
    return updated

}

const removeRecipe = async(id) =>{
    
    const deleted = getRecipeById(id)
    await db('recipes').where('recipe_id',id).delete()
    return deleted

}

const recipeAndIngs = async (id) =>{

    const recipe = await getRecipeById(id)
    const ings =  await db('recipe2ingredients as ri')
    .join('measurements as ms', 'ms.measurement_id','ri.measurement_id')
    .join('units as u', 'u.unit_id', 'ri.unit_id')
    .join('ingredients as ing', 'ing.ingredient_id', 'ri.ingredient_id')
    .select('r2i_id','ri.recipe_id','ms.measurement_amount', 'u.unit_name', 'ing.ingredient_name')
    .where('ri.recipe_id', id) 

    return {recipe,ings}

}



module.exports = {getRecipeBF,getRecipes, getRecipeById, addRecipe, updateRecipe,removeRecipe, recipeAndIngs}