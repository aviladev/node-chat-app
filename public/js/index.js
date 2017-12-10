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

socket.on('newMessage', ({from, text}) => {
  const li = jQuery('<li></li>')
  li.text(`${from}: ${text}`)

  jQuery('#messages').append(li)
})

jQuery('#message-form').on('submit', (ev) => {
  ev.preventDefault()
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, () => {
    
  })
})
