'use strict'

class UserController {
  async getMe({ request }) {
    return request.user
  }
}

module.exports = UserController
