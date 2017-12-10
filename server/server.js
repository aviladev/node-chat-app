const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const PORT = process.env.PORT || 3000
const PUBLIC_PATH = path.join(__dirname, "../public")

const app = express()
const server = http.createServer(app)
const io = socketIO(server)

app.use(express.static(PUBLIC_PATH))

io.on('connection', socket => {
  console.log('New user connected')

  socket.on('createMessage', message => {
    console.log('createMessage', message)
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: Date.now()
    })
  })

  socket.on('disconnect', () =>
    console.log('Client disconnected')
  )
})

server.listen(PORT, () =>
  console.log(`Up and running! PORT: ${PORT}`)
)
