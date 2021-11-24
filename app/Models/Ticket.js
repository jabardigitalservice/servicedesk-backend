'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Ticket extends Model {
  categories () {
    this.belongsTo('App/Models/Category')
  }
}

module.exports = Ticket
