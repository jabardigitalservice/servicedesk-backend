'use strict'

class UserController {
  async getMe({ request, response }) {
    const data = request.body
    
    console.log('data user', data)
    response =
    {
      "name": data.name,
      "email": data.email
    }

    return response
  }

}

module.exports = UserController
