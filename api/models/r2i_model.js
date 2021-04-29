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

module.exports = {getR2Ibf,getAllR2I, getR2IById, addR2I}