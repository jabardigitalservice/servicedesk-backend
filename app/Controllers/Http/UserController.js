'use strict'

const AuthController = use('App/Controllers/Http/AuthController')

class UserController {
  async getMe({ req, response }) {
    const authController = new AuthController()
    const data = authController.validateToken({ req, response })
    
    console.log(data)
  }
}

module.exports = UserController

