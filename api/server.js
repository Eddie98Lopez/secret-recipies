const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const authRouter = require("./routers/auth_router/auth_router")
const recipeRouter = require('./routers/recipe_router/recipe_route')
const unitsRouter = require('./routers/units_router/units_route')
const categoriesRouter = require('./routers/categories_router/categories_route')
const restricted = require('./restricted')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/auth', authRouter)
server.use('/api/units', restricted, unitsRouter)
server.use('/api/categories', restricted, categoriesRouter)
server.use('/api/recipes', restricted, recipeRouter)



module.exports = server
