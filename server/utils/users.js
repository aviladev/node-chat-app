class Users {
  constructor () {
    this.users = []
  }

  addUser (id, name, room) {
    const user = { id, name, room }
    this.users.push(user)
    return user
  }

  removeUser (id) {
    let removed

    this.users = this.users.filter(user => {
      if (user.id === id) {
        removed = user
        return false
      }
      return true
    })

    return removed
  }

  getUser (id) {
    const user = this.users.find(user => user.id === id)

    return user
  }

  getUserList(room) {
    const users = this.users.filter(user =>
      user.room === room
    )
    const namesArray = users.map(user => user.name)

    return namesArray
  }
}

module.exports = { Users }
