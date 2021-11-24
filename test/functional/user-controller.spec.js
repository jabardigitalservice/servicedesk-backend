'use strict'

const TestFunctions = require('../TestFunctions')

const { test, trait } = use('Test/Suite')('User Controller')

trait('Test/ApiClient')

test('Valid SSO token should be able to retrieves user information', async ({ client }) => {
  const username = process.env.USERNAME
  const password = process.env.PASSWORD
  const token = await TestFunctions.getToken({ client, username, password })

  const response = await client
    .get('/me')
    .header({
      Authorization: `Bearer ${token}`,
    })
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    name: process.env.USER,
    email: username
  })
}).timeout(0)
