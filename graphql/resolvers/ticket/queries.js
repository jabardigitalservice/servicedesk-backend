'use strict'

const Ticket = use('App/Models/Ticket')

const queries = {

  async listOwnTickets (root, { username }) {
    const list = await Ticket
      .query()
      .where('username', username)
      .fetch()

    return list.toJSON()
  },
}

module.exports = queries
