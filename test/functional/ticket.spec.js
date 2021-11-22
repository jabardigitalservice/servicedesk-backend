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
  const tickets = await Factory.model('App/Models/Ticket').createMany(7)

  await TicketsModel
    .query()
    .where('id', tickets[0].id)
    .orWhere('id', tickets[2].id)
    .orWhere('id', tickets[3].id)
    .update({
      username: username
    })

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

  categories[0] = await CategoriesModel.find(tickets[0].category_id)
  categories[2] = await CategoriesModel.find(tickets[2].category_id)
  categories[3] = await CategoriesModel.find(tickets[3].category_id)

  response.assertJSONSubset({
    data: {
      listOwnTickets:
        [
          {
            id: tickets[0].id,
            username: username,
            category: {
              name: categories[0].name
            },
            title: tickets[0].title,
            status: tickets[0].status
          },
          {
            id: tickets[2].id,
            username: username,
            category: {
              name: categories[2].name
            },
            title: tickets[2].title,
            status: tickets[2].status
          },
          {
            id: tickets[3].id,
            username: username,
            category: {
              name: categories[3].name
            },
            title: tickets[3].title,
            status: tickets[3].status
          }
        ]
    }
  })
})

test('Employee can view detail ticket support', async ({ client }) => {
  const username = process.env.USERNAME
  await Factory.model('App/Models/Category').createMany(4)
  await Factory.model('App/Models/Ticket').createMany(3)

  await TicketsModel
    .query()
    .where('id', 1)
    .orWhere('id', 2)
    .update({
      username: username
    })

  const data = await TicketsModel.findOrFail(1)
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
  await Factory.model('App/Models/Ticket').createMany(4)

  await TicketsModel
    .query()
    .where('id', 2)
    .orWhere('id', 4)
    .update({
      username: username
    })

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
      variables: { id: 4 }
    }))
    .end()

  response.assertJSONSubset({
    data: { deleteTicket: true }
  })
})

test('Employee can update existing ticket support', async ({ client }) => {
  const username = process.env.USERNAME
  await Factory.model('App/Models/Category').createMany(4)
  const tickets = await Factory.model('App/Models/Ticket').createMany(5)

  await TicketsModel
    .query()
    .where('id', tickets[1].id)
    .orWhere('id', tickets[3].id)
    .update({
      username: username
    })

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
        id: tickets[3].id,
        inputTicket: {
          title: null,
          description: 'this is an updated claim',
          status: 'ON_PROCESS'
        }
      }
    }))
    .end()

  response.assertJSONSubset({
    data: {
      updateTicket: {
        title: tickets[3].title,
        id: tickets[3].id,
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
