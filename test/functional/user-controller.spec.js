'use strict'

const { test, trait } = use('Test/Suite')('User Controller')

trait('Test/ApiClient')

test('Valid SSO token should be able to retrieves user information', async ({ client }) => {
  const SSO_TOKEN = await client
    .post(process.env.TokenURL)
    .header(
      { 
        "content-type" : "application/x-www-form-urlencoded",
        "Accept-Encoding" : "gzip, deflate, br"
      }
    )
    .send(
      {
        grant_type: process.env.grant_type,
        client_id: process.env.client_id,
        username: process.env.selvy,
        password: process.env.selvyPass
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
    email: process.env.selvy
  })
}).timeout(0)
  