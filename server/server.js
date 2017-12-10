const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const { generateMessage } = require('./utils/message')

const PORT = process.env.PORT || 3000
const PUBLIC_PATH = path.join(__dirname, "../public")

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(PUBLIC_PATH))

io.on('connection', socket => {
  console.log('New user connected')

  socket.emit('newMessage',
    generateMessage('Admin', 'Welcome to the chat app')
  )

  socket.broadcast.emit('newMessage',
    generateMessage('Admin', 'New user joined')
  )

  socket.on('createMessage', ({from, text}, callback) => {
    io.emit('newMessage', generateMessage(from, text))
    callback('This is from the server')
  })

  socket.on('disconnect', () =>
    console.log('Client disconnected')
  )
})

server.listen(PORT, () =>
  console.log(`Up and running! PORT: ${PORT}`)
)
