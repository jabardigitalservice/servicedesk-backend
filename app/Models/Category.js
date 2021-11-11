'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
  constructor (name, description) {
    super()
    this.name = name
    this.description = description
  }

  isValid () {
    if (!this.name) return false

    return true
  }
}

module.exports = Category
