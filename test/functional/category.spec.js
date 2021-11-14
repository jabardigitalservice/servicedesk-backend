'use strict'

const { test, trait, beforeEach } = use('Test/Suite')('Category')
const Factory = use('Factory')

trait('Test/ApiClient')

beforeEach(async () => {
  await Factory.model('App/Models/Category').reset()
})

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

test('get detail of a category', async ({ client, assert }) => {
  const category = await Factory.model('App/Models/Category').create()
  await Factory.model('App/Models/Category').createMany(2)

  const id = category.$attributes.id

  const data = {
    query: ` 
      {
        categories(id:${id}) {
          id
          name
          description
        }
      }`
  }

  const response = await client.post('/graphql').send(data).end()

  response.assertStatus(200)
  assert.exists(response.body.data.categories)
  assert.equal(response.body.data.categories.length, 1)
})
