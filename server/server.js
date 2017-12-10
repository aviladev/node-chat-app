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

  socket.emit('newMessage', {
    from: 'John',
    text: 'See you then',
    createdAt: 123123
  })

  socket.on('createMessage', message =>
    console.log('createMessage', message)
  )

  socket.on('disconnect', () =>
    console.log('Client disconnected')
  )
})

server.listen(PORT, () =>
  console.log(`Up and running! PORT: ${PORT}`)
)
