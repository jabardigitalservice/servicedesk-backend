'use strict'

const { test, trait } = use('Test/Suite')('Category')
const Factory = use('Factory')

trait('Test/ApiClient')

test('get list of categories', async ({ client, assert }) => {
  await Factory.model('App/Models/Category').createMany(3)

  const data = {
    query: ` 
      {
        categories {
          id
          name
          description
        }
      }`
  }

  const response = await client.post('/graphql').send(data).end()

  response.assertStatus(200)
  assert.exists(response.body.data.categories)
  assert.equal(response.body.data.categories.length, 3)
})
