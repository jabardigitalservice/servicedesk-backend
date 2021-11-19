'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TicketSchema extends Schema {
  up () {
    this.create('tickets', (table) => {
      table.increments()
      table.string('username', 30).notNullable()
      table.string('title', 100).notNullable()
      table.string('description', 600).notNullable()
      table.integer('category_id')
        .notNullable()
        .references('id')
        .inTable('categories')
      table.string('attachment')
      table.enu('status', ['OPEN', 'ON_PROCESS', 'CLOSED']).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.table('tickets', (table) => {
      table.dropForeign('category_id')
    })
    this.drop('tickets')
  }
}

module.exports = TicketSchema
