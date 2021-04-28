const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const authRouter = require("./routers/auth_router/auth_router")

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/auth', authRouter)



module.exports = server
