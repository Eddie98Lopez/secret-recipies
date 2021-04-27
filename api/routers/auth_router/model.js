const db = require('../../data/db-config')

const getUserById = (id) =>{
    return db('users').select('user_username','user_id', 'user_phone', 'user_name').where('user_id', id).first()
}

const addUser = async (user) => {
    const [id] = await db('users').insert(user)
    return getUserById(id)
}

module.exports = {
    addUser
}