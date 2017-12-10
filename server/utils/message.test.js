const expect = require('expect')

const { generateMessage } = require('./message')

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    const from = 'User'
    const text = 'Hello'

    const message = generateMessage(from, text)

    expect(message).toMatchObject({ from, text })
    expect(typeof message.createdAt).toBe('number')
  })
})
