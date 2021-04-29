const db = require('../data/db-config')

const getMeasBF = (filter) => {
    return db('measurements').where(filter).first()
}

const getAllMeas = () =>{
    return db('measurements')
}

const getMeasById = (id) => {

    return db('measurements').where('ingredients_id',id).first()
}

const addMeas = async (newData) =>{
    
    const [id]= await db('measurements').insert(newData).returning("measurement_id")
    return db('measurements').where("measurement_id",id).first()
}

module.exports = {getMeasBF,getAllMeas, getMeasById, addMeas}