'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CategorySchema extends Schema {
  up () {
    this.create('categories', (table) => {
      table.increments()
      table.string('name', 20).notNullable()
      table.string('description', 200).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('categories')
  }
}

module.exports = CategorySchema
