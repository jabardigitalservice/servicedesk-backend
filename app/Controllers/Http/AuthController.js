'use strict'

const jwt = require('jsonwebtoken')
const jwksClient = require('jwks-rsa')
const client = jwksClient({
  jwksUri: 'https://sso.digitalservice.jabarprov.go.id/auth/realms/jabarprov/protocol/openid-connect/certs'
})

class AuthController {
  async getToken(req) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] 

    return token
  }

  async getKey(header, callback) {
    client.getSigningKey(header.kid, (err, key) => {
      const signingKey = key.publicKey || key.rsaPublicKey
      callback(null, signingKey)
    });
  }

  async validateToken({ req, response }) {
    const token = await this.getToken(req)

    jwt.verify(token, this.getKey, (err, decoded) => {      
      if(err) {
        return response.status(401).send({ err: err  })
      }

      const user = { name: decoded['name'], email: decoded['email']}
      console.log(user)
      
      return decoded
    })
  }
}

module.exports = AuthController
