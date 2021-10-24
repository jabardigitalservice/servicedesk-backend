'use strict'

const jwt = require('jsonwebtoken')

class AuthController {

  async getToken({ request }) {
    const authHeader = request.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] 
   
    return token
  }

    async validateToken({ request }) {
    const token = await this.getToken(request)

    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.secret, (err, decoded) => {      
    
        if(err) {
          reject(err)
        } else {
          resolve(decoded)
          console.log('validate', resolve(decoded))
        }
      })
    })
  }
}

module.exports = AuthController
