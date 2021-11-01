'use strict'

const Config = use('Config')

const { test, trait } = use('Test/Suite')('User Controller')

trait('Test/ApiClient')

test('Valid SSO token should be able to retrieves user information', async ({ client }) => {
  const SSO_TOKEN = await client
    .post(Config.get('sso.tokenUrl'))
    .header(
      { 
        "content-type" : "application/x-www-form-urlencoded",
        "Accept-Encoding" : "gzip, deflate, br"
      }
    )
    .send(
      {
        grant_type: "password",
        client_id: Config.get('sso.client_id'),
        username: process.env.USERNAME,
        password: process.env.PASSWORD
      }
    )
    .end()

  const token = SSO_TOKEN.body.access_token
    
  const response = await client
    .get('/me')
    .header({
      Authorization: `Bearer ${token}`,
    })
    .end()
  
  response.assertStatus(200)
  response.assertJSONSubset({
    name: 'Selvy Fitriani',
    email: process.env.USERNAME
  })
}).timeout(0)
  