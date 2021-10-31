'use strict'

class UserController {
  async getMe({ session }) {
    return session.get('user')
  }
}

module.exports = UserController
