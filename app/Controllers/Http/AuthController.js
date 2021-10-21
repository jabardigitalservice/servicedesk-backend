'use strict'

const jwt = require('jsonwebtoken')

class AuthController {
  async getToken(req) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] 

    return token
  }

  async validateToken({ req, res }) {
    const token = await this.getToken(req)
    console.log(token)
  }
}

module.exports = AuthController
