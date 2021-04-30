const db = require('../data/db-config')

const getRecipeBF = (filter) => {
    return db('recipes').where(filter).first()
}

const getRecipes = () =>{
    return db('recipes')
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

}

const removeRecipe = async(id) =>{
    
    const deleted = getRecipeById(id)
    await db('recipes').where('recipe_id',id).delete()
    return deleted

}




module.exports = {getRecipeBF,getRecipes, getRecipeById, addRecipe, updateRecipe,removeRecipe}