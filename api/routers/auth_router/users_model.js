const db = require('../../data/db-config')

const getById = (id) =>{
    return db('users').select('user_id','user_username','user_name').where('user_id', id).first()
}

const addUser = async (user) => {
    const [id] = await db('users').insert(user).returning("user_id")
    return getById(id)
}

const getByFilter = (filter) =>{
    return db('users').where(filter).first()
}

module.exports = {
    addUser,getByFilter
}