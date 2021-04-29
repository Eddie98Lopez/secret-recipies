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

const getRecipeIngs = (id) => {

    /*  select recipe_id, measurement_amount,unit_name,ingredient_name from recipe2ingredients as r2i
        join units on units.unit_id = r2i.unit_id 
        join measurements as ms on ms.measurement_id=r2i.measurement_id
        join ingredients as i on i.ingredient_id = r2i.ingredient_id
        where r2i.recipe_id = 4 */


    return db('recipe2ingredients as ri')
        .join('measurements as ms', 'ms.measurement_id','ri.measurement_id')
        .join('units as u', 'u.unit_id', 'ri.unit_id')
        .join('ingredients as ing', 'ing.ingredient_id', 'ri.ingredient_id')
        .select('r2i_id','ri.recipe_id','ms.measurement_amount', 'u.unit_name', 'ing.ingredient_name')
        .where('ri.recipe_id', id) 


       
}

module.exports = {getRecipeBF,getRecipes, getRecipeById, addRecipe, getRecipeIngs}