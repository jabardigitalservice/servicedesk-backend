'use strict'

const Response = require('@adonisjs/framework/src/Response')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const jwt = use('jsonwebtoken')

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

  async handle ({ request }, next) {
    
    const token = await this.getToken(request)

    const payload = await jwt.verify(token, process.env.secret)  

    if (!payload) { return Response.status(401)}

    request.body = payload
  
    console.log(payload)

    await next()
  }

}

module.exports = AuthController
