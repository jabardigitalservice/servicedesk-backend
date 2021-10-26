'use strict'

const Response = require('@adonisjs/framework/src/Response')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const jwt = use('jsonwebtoken') 
const jwksClient = require('jwks-rsa')
const client = jwksClient({
  jwksUri: 'https://sso.digitalservice.jabarprov.go.id/auth/realms/jabarprov/protocol/openid-connect/certs'
})

class AuthController {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */

   async getToken({ request }) {
    const authHeader = request.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] 
   
    return token
  }

  async getKey(header, callback) {
    client.getSigningKey(header.kid, (err, key) => {
      const signingKey = key.publicKey || key.rsaPublicKey
      callback(null, signingKey)
    });
  }
  
  async handle ({ request, response}, next ) {
    const token = await this.getToken(request)
  
    const payload = await new Promise((resolve, reject) => {
      jwt.verify(token, this.getKey, (error, payload) => {      
        if(error) {
          reject(error)
        } else {
          resolve(payload)
        }
      })
    })
    .then((payload) => {
      return payload
    })
    .catch((error) => {
      return response.status(401).send(error.message)
    })
    
    request.body.payload = payload

    await next()
  }
}

module.exports = AuthController
