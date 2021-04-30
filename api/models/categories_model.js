const db = require('../data/db-config')

const getCats = () =>{
    return db('categories')
}

module.exports = {getCats}