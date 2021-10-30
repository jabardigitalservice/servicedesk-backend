'use strict'

class UserController {
  async getMe({ request, response, session }) {
    return session.get('user')
  }

}

module.exports = UserController
