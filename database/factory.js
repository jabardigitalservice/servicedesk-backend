'use strict'
/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/Category', async (faker) => {
  return {
    name: faker.word({ length: 20 }),
    description: faker.sentence({ length: 50 })
  }
})

Factory.blueprint('App/Models/Ticket', (faker) => {
  return {
    username: faker.string({ length: 30 }),
    title: faker.string({ length: 100 }),
    description: faker.sentence({ length: 600 }),
    category_id: faker.integer({ min: 1, max: 3 }),
    attachment: faker.url(),
    status: faker.weighted(['OPEN', 'ON_PROCESS', 'CLOSED'], [1, 1, 1])
  }
})
