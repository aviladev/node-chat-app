const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const { generateMessage, generateLocationMessage } = require('./utils/message')
const { isRealString } = require('./utils/validation')
const { Users } = require('./utils/users')

const PORT = process.env.PORT || 3000
const PUBLIC_PATH = path.join(__dirname, "../public")

const app = express()
const server = http.createServer(app)
const io = socketIO(server)
const users = new Users()

app.use(express.static(PUBLIC_PATH))

io.on('connection', socket => {
  console.log('New user connected')

  socket.on('join', ({name, room}, callback) => {
    if (!isRealString(name) || !isRealString(room)) {
      return callback('Name and room name are required.')
    }

    socket.join(room)

    users.removeUser(socket.id)
    users.addUser(socket.id, name, room)

    io.to(room).emit('updateUserList', users.getUserList(room))

    socket.emit('newMessage',
      generateMessage('Admin', 'Welcome to the chat app')
    )

    socket.broadcast.to(room).emit('newMessage',
      generateMessage('Admin', `${name} has joined.`)
    )

    callback()
  })

  socket.on('createMessage', ({text}, callback) => {
    const user = users.getUser(socket.id)
    const { name, room } = user

    if (user && isRealString(text)) {
      io.to(room).emit('newMessage', generateMessage(name, text))
    }
    callback()
  })
  
  socket.on('createLocationMessage', ({latitude, longitude}, callback) => {
    const user = users.getUser(socket.id)
    const { name, room } = user

    if (user) {
      io.to(room)
        .emit(
          'newLocationMessage',
          generateLocationMessage(name, latitude, longitude)
        )
    }
    callback()
  })

  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id)

    if (user) {
      io.to(user.room)
        .emit('updateUserList', users.getUserList(user.room))
      io.to(user.room)
        .emit('newMessage', generateMessage('Admin', `${user.name} has left.`))
    }
  })
})

server.listen(PORT, () =>
  console.log(`Up and running! PORT: ${PORT}`)
)
