'use strict'

const Factory = use('Factory')
const TicketsModel = require('../../app/Models/Ticket')
const CategoriesModel = require('../../app/Models/Category')
const { test, trait } = use('Test/Suite')('Ticket')

trait('Test/ApiClient')

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
            categoryByCategoryId {
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
            categoryByCategoryId: {
              name: categories[0].name
            },
            title: tickets[0].title,
            status: tickets[0].status
          },
          {
            id: tickets[2].id,
            username: username,
            categoryByCategoryId: {
              name: categories[2].name
            },
            title: tickets[2].title,
            status: tickets[2].status
          },
          {
            id: tickets[3].id,
            username: username,
            categoryByCategoryId: {
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
  await Factory.model('App/Models/Category').createMany(4)
  await Factory.model('App/Models/Ticket').createMany(3)

  await TicketsModel
    .query()
    .where('id', 1)
    .orWhere('id', 2)
    .update({
      username: process.env.USERNAME
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
            categoryByCategoryId {
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
        categoryByCategoryId: {
          name: foreign.name
        }
      }
    }
  })
})
