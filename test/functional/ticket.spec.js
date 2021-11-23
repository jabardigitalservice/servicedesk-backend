'use strict'

const Factory = use('Factory')
const Database = use('Database')
const TicketsModel = require('../../app/Models/Ticket')
const CategoriesModel = require('../../app/Models/Category')
const { test, trait, beforeEach } = use('Test/Suite')('Ticket')

trait('Test/ApiClient')

beforeEach(async () => {
  await TicketsModel.truncate()
  await Database.raw('truncate categories cascade')
  await Database.raw('ALTER SEQUENCE categories_id_seq RESTART WITH 1')
})

test('Employee can view list of own ticket support', async ({ client }) => {
  const username = process.env.USERNAME
  const categories = await Factory.model('App/Models/Category').createMany(4)
  await Factory.model('App/Models/Ticket').createMany(7)

  const toGet = await TicketsModel.first()
  toGet.username = username
  await toGet.save()

  const response = await client
    .post('/graphql')
    .header({
      'content-type': 'application/json'
    })
    .send(JSON.stringify({
      query: `
        query ListOwnTickets($username: String!) {
          listOwnTickets(username: $username) {
            id
            username
            category {
              name
            }
            title
            status
          }
        }`,
      variables: {
        username: username,
      }
    }))
    .end()

  categories[0] = await CategoriesModel.find(toGet.category_id)

  response.assertJSONSubset({
    data: {
      listOwnTickets:
        [
          {
            id: toGet.id,
            username: username,
            category: {
              name: categories[0].name
            },
            title: toGet.title,
            status: toGet.status
          }
        ]
    }
  })
})

test('Employee can view detail ticket support', async ({ client }) => {
  const username = process.env.USERNAME
  await Factory.model('App/Models/Category').createMany(4)
  await Factory.model('App/Models/Ticket').create()

  const data = await TicketsModel.first()
  data.username = username
  await data.save()
  const foreign = await CategoriesModel.findOrFail(data.category_id)

  const response = await client
    .post('/graphql')
    .header({
      'content-type': 'application/json'
    })
    .send(JSON.stringify({
      query: `
        query ViewOwnTickets($id: Int!) {
          ticket(id: $id) {
            username
            title
            status
            category {
              name
            }
          }
        }`,
      variables: {
        id: 1,
      }
    }))
    .end()

  response.assertJSONSubset({
    data: {
      ticket: {
        username: data.username,
        title: data.title,
        status: data.status,
        category: {
          name: foreign.name
        }
      }
    }
  })
})

test('Employee can delete own ticket by Id', async ({ client }) => {
  const username = process.env.USERNAME
  await Factory.model('App/Models/Category').createMany(3)
  await Factory.model('App/Models/Ticket').create()

  const data = await TicketsModel.first()
  data.username = username
  await data.save()

  const response = await client
    .post('/graphql')
    .header({
      'content-type': 'application/json'
    })
    .send(JSON.stringify({
      query: `
        mutation DeleteTicketById($id: Int!) {
          deleteTicket(id: $id)
        }`,
      variables: { id: data.id }
    }))
    .end()

  response.assertJSONSubset({
    data: { deleteTicket: true }
  })
})

test('Employee can update existing ticket support', async ({ client }) => {
  const username = process.env.USERNAME
  await Factory.model('App/Models/Category').createMany(4)
  await Factory.model('App/Models/Ticket').create()

  const data = await TicketsModel.first()
  data.username = username
  await data.save()

  const response = await client
    .post('/graphql')
    .header({
      'content-type': 'application/json'
    })
    .send(JSON.stringify({
      query: `
        mutation UpdateTicketById($id: Int!, $inputTicket: inputTicket) {
          updateTicket(id: $id, input: $inputTicket) {
            title
              id
              description
              status
          }
        }`,
      variables: {
        id: data.id,
        inputTicket: {
          title: '',
          description: 'this is an updated claim',
          status: 'ON_PROCESS'
        }
      }
    }))
    .end()

  response.assertJSONSubset({
    data: {
      updateTicket: {
        title: data.title,
        id: data.id,
        description: 'this is an updated claim',
        status: 'ON_PROCESS'
      }
    }
  })
})

test('Employee can create/ open new Ticket Support', async ({ client }) => {
  const username = process.env.USERNAME
  await Factory.model('App/Models/Category').createMany(4)

  const response = await client
    .post('/graphql')
    .header({
      'content-type': 'application/json'
    })
    .send(JSON.stringify({
      query: `
        mutation CreateTicket($inputTicket: newTicket) {
          createTicket(input: $inputTicket) {
            username
            title
            status
          }
        }`,
      variables: {
        inputTicket: {
          username: username,
          title: 'its a new ticket',
          description: 'description of a new ticket by me',
          category_id: 2,
          status: 'OPEN'
        }
      }
    }))
    .end()

  response.assertJSONSubset({
    data: {
      createTicket: {
        username: username,
        title: 'its a new ticket',
        status: 'OPEN'
      }
    }
  })
})
