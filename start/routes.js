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
const graphQLServer = require('./../graphql')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.get('/me', 'UserController.getMe').middleware('auth')

Route.post('/graphql', async ({ request }) => {
  return graphQLServer.executeOperation({
    query: request.body.query,
  })
})
