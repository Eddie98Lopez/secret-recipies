const db = require('../data/db-config')

const getUnits = () =>{
    return db('units')
}

module.exports = {getUnits}