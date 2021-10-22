'use strict'

const AuthController = use('App/Controllers/Http/AuthController')

class UserController {
  async getMe({ req, response }) {
    const authController = new AuthController()
    const data = authController.validateToken({ req, response })
    
    data.then((result) => {
      const user = { name: result['name'], email: result['email'] }
      console.log(user)
    }).catch((err) => {
      console.log(err)
    })
  }
}

module.exports = UserController
