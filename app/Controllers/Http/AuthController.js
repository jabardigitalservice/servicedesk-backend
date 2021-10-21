'use strict'

class AuthController {
  async getSplittedToken(req) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] 
    
    return token.split('.')
  }

  async validateToken({ req, res }) {
    const [ header, payload, signature ] = await this.getSplittedToken(req)
  }
}

module.exports = AuthController
