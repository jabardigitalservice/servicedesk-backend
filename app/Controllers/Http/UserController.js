'use strict'

const AuthController = use('App/Controllers/Http/AuthController')

class UserController {
  async getMe({ req, response }) {
    const authController = new AuthController()
    const data = await authController.validateToken({ req, response })
    
    const user = { name: data['name'], email: data['email'] }

    response.status(200).send(user)
  }
}

module.exports = UserController
