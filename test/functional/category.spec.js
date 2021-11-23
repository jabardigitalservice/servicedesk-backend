'use strict'


const Database = use('Database')
const { test, trait, beforeEach } = use('Test/Suite')('Category')
const Factory = use('Factory')

trait('Test/ApiClient')

beforeEach(async () => {
  await Database.raw('truncate categories cascade')
  await Database.raw('ALTER SEQUENCE categories_id_seq RESTART WITH 1')
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
  assert.equal(response.body.data.categories.length, 3)
})

test('get detail of a category', async ({ client, assert }) => {
  const category = await Factory.model('App/Models/Category').create()

  const id = category.id

  const data = {
    query: ` 
      {
        getCategory(id:${id}) {
          id
          name
          description
        }
      }`
  }

  const response = await client.post('/graphql').send(data).end()

  response.assertStatus(200)
  assert.exists(response.body.data.getCategory.id)
})

test('create new category', async ({ client, assert }) => {
  const data = {
    query: `
      mutation {
        createCategory(name: "Category name", description: "Category description"){
          id
        }
      }
    `
  }

  const response = await client.post('/graphql').send(data).end()

  response.assertStatus(200)
  assert.exists(response.body.data.createCategory.id)
})

test('update existing category', async ({ client, assert }) => {
  const category = await Factory.model('App/Models/Category').create()
  const id = category.id

  const data = {
    query: `
      mutation {
        updateCategory(id: ${id}, name:"New category name", description: "New category description"){
          id,
          name,
          description
        }
      }
    `
  }

  const response = await client.post('/graphql').send(data).end()

  response.assertStatus(200)
  assert.equal(response.body.data.updateCategory.id, id)
  assert.equal(response.body.data.updateCategory.name, 'New category name')
  assert.equal(response.body.data.updateCategory.description, 'New category description')
})

test('delete existing category', async ({ client, assert }) => {
  const category = await Factory.model('App/Models/Category').create()
  const id = category.id

  const data = {
    query: `
      mutation {
        deleteCategory(id: ${id})
      }
    `
  }

  const response = await client.post('/graphql').send(data).end()

  response.assertStatus(200)
  assert.isTrue(response.body.data.deleteCategory)
})
