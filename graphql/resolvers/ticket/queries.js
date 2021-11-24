'use strict'

const Ticket = use('App/Models/Ticket')

const queries = {
  async tickets () {
    const tickets = await Ticket.all()

    return tickets.toJSON()
  },

  async listOwnTickets (root, { username }) {
    const list = await Ticket
      .query()
      .where('username', username)
      .fetch()

    return list.toJSON()
  },

  async ticket (root, { id }) {
    return await Ticket.findOrFail(id)
  }
}

module.exports = queries
