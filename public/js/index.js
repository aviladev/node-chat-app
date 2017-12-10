const socket = io()

socket.on('connect', () => {
  console.log('Connected to the server')

  socket.emit('createMessage', {
    from: 'Pedro',
    text: "Hey, what's up"
  })
})

socket.on('disconnect', () =>
  console.log('Disconnected from server')
)

socket.on('newMessage', (message) => {
  console.log('newMessage', message)
})
