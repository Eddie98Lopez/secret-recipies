const db = require('../../data/db-config')


const getByFilter = (table,filter) => {
    return db(table).where(filter).first()
}

const getAll = (table) =>{
    return db(table)
}

const getById = (table,id) => {
    const str = table.substring(0, str.length - 1);
    return db(table).where(`${str}_id`,id).first()
}

const addNew = async (table, newData) =>{
    const str = table.substring(0, str.length - 1);
    const [id]= await db(table).insert(newData).returning(`${str}_id`)
    return getById(table,id)
}

const getRecipe = async (id) => {
    const recipe = await getById('recipes',id)
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
    getByFilter,getAll,addNew, getRecipe
}

