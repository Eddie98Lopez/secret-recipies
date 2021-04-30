const db = require('../data/db-config')

const getIngByFilter = (filter) => {
    return db('ingredients').where(filter).first()
}

const getAllIng = () =>{
    return db('ingredients')
}

const getIngById = (id) => {
    return db('ingredients').where('ingredients_id',id).first()
}

const addIng = async (newData) =>{
    const [id]= await db('ingredients').insert(newData).returning('ingredient_id')
    return db('ingredients').where('ingredient_id',id).first()
}

module.exports = {getIngByFilter,getAllIng, getIngById, addIng}