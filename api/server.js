const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const authRouter = require("./routers/auth_router/auth_router")
const recipeRouter = require('./routers/recipe_router/recipe_route')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/auth', authRouter)
server.use('/api/recipes', recipeRouter)



module.exports = server
