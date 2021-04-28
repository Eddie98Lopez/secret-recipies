const db = require('../../data/db-config')

const getById = (id) =>{
    return db('users').where('id', id).fir
}

const addUser = async (user) => {
    await db('users').insert(user)
    
    return db('users').select('user_username','user_id', 'user_phone', 'user_name').where({user_username:user.user_username}).first()
}

const getByFilter = (filter) =>{
    return db('users').where(filter).first()
}

module.exports = {
    addUser,getByFilter
}