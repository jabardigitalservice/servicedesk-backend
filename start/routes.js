'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const graphQlServer = require('../graphql')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.get('/me', 'UserController.getMe').middleware('auth')

Route.post('/graphql', async ({ request }) => {
  return graphQlServer.executeOperation({
    query: request.body.query,
    variables: request.body.variables
  })
})

Route.get('/graphql', async () => {
  graphQlServer.listen(9000)
  return { playground: 'https://studio.apollographql.com/sandbox/explorer?endpoint=http://localhost:9000' }
})
