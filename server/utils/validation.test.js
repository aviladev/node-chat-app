const expect = require('expect')

const { isRealString } = require('./validation')

describe('isRealString', () => {
  it('should reject non-string values', () => {
    const values = [ {}, [], 10, true, null, undefined, Symbol() ]

    const rejected = values.every(value => !isRealString(value))
    expect(rejected).toBe(true)
  })

  it('should reject string with only spaces', () => {
    const str = '   \t  \n   '

    expect(isRealString(str)).toBe(false)
  })

  it('should allow strings with non-space characters', () => {
    const str = '\tText  \n'

    expect(isRealString(str)).toBe(true)
  })
})
