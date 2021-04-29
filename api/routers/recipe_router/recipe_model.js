const db = require('../../data/db-config')




const addRecipe = async(newData) => {

    const [id] = await db('recipes').insert(newData).returning("recipe_id")
    return db('recipes').where({recipe_id: id}).first()

}

const getRecipe = async (id) => {
    //const recipe = await db('recipes').where('recipe_id',id).first()

    /*  select recipe_id, measurement_amount,unit_name,ingredient_name from recipe2ingredients as r2i
        join units on units.unit_id = r2i.unit_id 
        join measurements as ms on ms.measurement_id=r2i.measurement_id
        join ingredients as i on i.ingredient_id = r2i.ingredient_id
        where r2i.recipe_id = 4 */

        console.log('We are in the getRecipe functions')

    const ingredients = await db('recipe2ingredients as r2i')
        .join('measurements as m', 'm.measurement_id','r2i.measurement_id')
        .join('units as u', 'u.unit_id', 'r2i.unit_id')
        .join('ingredients as ing', 'ing.ingredient_id', 'r2i.ingredient_id')
        .select('m.measurement_amount', 'u.unit_name', 'ing.ingredient_name')
        .where('r2i.recipe_id', id)

        console.log(ingredients)

    

        return ingredients
}


module.exports = {
     getRecipe, addRecipe
}

