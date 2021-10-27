'use strict'

class UserController {
  async getMe({ request, response }) {
    
    const data = request.body
    response =
    {
      "name": data.name,
      "email": data.email
    }

    return response
  }

}

module.exports = UserController
