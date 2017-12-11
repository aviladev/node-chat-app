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

socket.on('newLocationMessage', ({from, url}) => {
  const li = jQuery('<li></li>')
  const a = jQuery('<a target="_blank">My current location</a>')

  li.text(`${from}: `)
  a.attr('href', url)
  li.append(a)

  jQuery('#messages').append(li)
})

jQuery('#message-form').on('submit', (ev) => {
  const messageTextBox = jQuery('[name=message]')

  ev.preventDefault()
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, () => {
    messageTextBox.val('')
  })
})

const locationButton = jQuery('#send-location')

locationButton.on('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser')
  }

  locationButton
    .prop('disabled', true)
    .text('Sending location...')
  
  navigator.geolocation.getCurrentPosition(({coords}) => {
    const { latitude, longitude } = coords
    socket.emit('createLocationMessage', {latitude, longitude}, () =>
      locationButton.prop('disabled', false).text('Send location')
    )
  }, () => {
    locationButton.prop('disabled', true).text('Send location')
    alert('Unable to fetch location.')
  })
})
