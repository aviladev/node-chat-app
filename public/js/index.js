const socket = io()

socket.on('connect', () => {
  console.log('Connected to the server')
})

socket.on('newUser', (message) => {
  console.log(message)
})

socket.on('disconnect', () =>
  console.log('Disconnected from server')
)

socket.on('newMessage', (message) => {
  console.log('newMessage', message)
})
