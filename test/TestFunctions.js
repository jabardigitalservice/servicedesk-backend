'use strict'

const Config = use('Config')

class TestFunctions {
  static async getToken ({ client, username, password }) {
    const SSO_TOKEN = await client
      .post(Config.get('sso.tokenUrl'))
      .header(
        {
          'content-type': 'application/x-www-form-urlencoded',
          'Accept-Encoding': 'gzip, deflate, br'
        }
      )
      .send(
        {
          grant_type: 'password',
          client_id: Config.get('sso.client_id'),
          username: username,
          password: password
        }
      )
      .end()

    return SSO_TOKEN.body.access_token
  }
}

module.exports = TestFunctions
