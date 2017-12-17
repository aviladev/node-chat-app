const expect = require('expect')

const { Users } = require('./users')

describe('Users', () => {
  let users

  beforeEach(() => {
    users = new Users()
    users.users = [{
      id: 1,
      name: 'Mike',
      room: 'Node'
    },{
      id: 2,
      name: 'Jen',
      room: 'React'
    },{
      id: 3,
      name: 'Julie',
      room: 'Node'
    }]
  })

  it('should add new user', () => {
    const users = new Users()
    const user = {
      id: 123,
      name: 'Pedro',
      room: 'Magic Node'
    }

    const res = users.addUser(user.id, user.name, user.room)

    expect(users.users).toEqual([user])
  })

  it('should return names for Node', () => {
    const userList = users.getUserList('Node')

    expect(userList).toEqual(['Mike', 'Julie'])
  })

  it('should return names for React', () => {
    const userList = users.getUserList('React')

    expect(userList).toEqual(['Jen'])
  })

  it('should remove a user', () => {
    const removedUser = users.removeUser(3)

    expect(removedUser.id).toBe(3)

    expect(users.users.length).toBe(2)
  })

  it('should not remove user', () => {
    const removedUser = users.removeUser(99)

    expect(removedUser).toBeFalsy()
    expect(users.users.length).toBe(3)
  })

  it('should find user', () => {
    const foundUser = users.getUser(2)

    expect(foundUser.id).toBe(2)
  })

  it('should not find user', () => {
    const foundUser = users.getUser(99)

    expect(foundUser).toBeFalsy()
  })
})
