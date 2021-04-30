const db = require('../data/db-config')

const getR2Ibf = (filter) => {
    return db('recipe2ingredients').where(filter).first()
}

const getAllR2I = () =>{
    return db('recipe2ingredients')
}

const getR2IById = (id) => {
    return db('recipe2ingredients').where('r2i_id',id).first()
}

const addR2I = async (newData) =>{
    const [id]= await db('recipe2ingredients').insert(newData).returning('r2i_id')
    return db('recipe2ingredients').where('r2i_id',id).first()
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

const removeRecipeIngs = async(id) => {
    const deletedRecIngs = getRecipeIngs(id)
    await db('recipe2ingredients').where('recipe_id', id).delete()
   return deletedRecIngs
}

module.exports = {getR2Ibf,getAllR2I, getR2IById, addR2I, removeRecipeIngs, getRecipeIngs}