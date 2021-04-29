const db = require('../../data/db-config')




const addRecipe = async(newData) => {

    const [id] = await db('recipes').insert(newData).returning("recipe_id")
    return db('recipes').where({recipe_id: id}).first()

}

const getRecipe = async (id) => {
    const recipe = await db('recipes').where('recipe_id',id).first()
    const ingredients = await db('ingredients as ing')
        .join('measurements as m')
        .join('units as u')
        .join('recipe2ingredients as r2i')
        .where('r2i.recipe_id', id)

        const allInfo = {
            ...recipe,
            ingredients: ingredients
        }

        return allInfo
}


module.exports = {
     getRecipe, addRecipe
}

