'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Config = use('Config')

const jwt = use('jsonwebtoken') 
const jwksClient = require('jwks-rsa')
const client = jwksClient({
  jwksUri: Config.get('sso.jwks')
})
const kid = Config.get('sso.kid')

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
  
  async getKey() {
    const key = await client.getSigningKey(kid)
    const signingKey = key.getPublicKey()
    
    return signingKey
  }
  async handle ({ request, response }, next ) {
    const token = await this.getToken(request)
    const key = await this.getKey()

    try {
      const decoded = jwt.verify(token, key)
      const user = {name: decoded['name'], email: decoded['email']}
      request.user = user

      await next()
    } catch (err) {
      response.status(401).send({ error: err.message })
    }
  }
}

module.exports = AuthController
