const expect = require('expect')

const { generateMessage, generateLocationMessage } = require('./message')

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    const from = 'User'
    const text = 'Hello'

    const message = generateMessage(from, text)

    expect(message).toMatchObject({ from, text })
    expect(typeof message.createdAt).toBe('number')
  })
})

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'User'
    const lat = '-19.919129'
    const lng = '-43.93871'

    const locationMessage = generateLocationMessage(from, lat, lng)

    expect(locationMessage)
      .toMatchObject({
        from,
        url: `https://www.google.com/maps?q=${lat},${lng}`
      })
    
    expect(typeof locationMessage.createdAt).toBe('number')
  })
})
