'use strict'

const jwt = use('jsonwebtoken')
const { test, trait } = use('Test/Suite')('User Controller')
const testVariables = require('../../test.json')

trait('Test/ApiClient')

test('Valid SSO token should be able to retrieves user information', async ({ assert, client }) => {
  const SSO_TOKEN = await client
    .post(testVariables.TokenURL)
    .header(
      { 
        "content-type" : "application/x-www-form-urlencoded",
        "Accept-Encoding" : "gzip, deflate, br"
      }
    )
    .send(
      testVariables.postman
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
  response.assertJSONSubset(testVariables.user)
}).timeout(0)
  