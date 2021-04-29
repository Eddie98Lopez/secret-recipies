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

module.exports = {getRecipeBF,getRecipes, getRecipeById, addRecipe}