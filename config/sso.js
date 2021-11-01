'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

module.exports = {
  tokenUrl: Env.get('TOKEN_URL'),
  jwks: Env.get('JWKS_URL'),
  kid: Env.get('KID'),
  client_id: Env.get('CLIENT_ID')
}
