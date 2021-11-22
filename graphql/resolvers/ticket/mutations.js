'use strict'

const Ticket = use('App/Models/Ticket')

const mutations = {
  async deleteTicket (root, { id }) {
    const toDelete = await Ticket.findOrFail(id)

    return await toDelete.delete()
  },
  async updateTicket (root, { id, input }) {
    await Ticket
      .query()
      .where('id', id)
      .update(input)

    return await Ticket.findOrFail(id)
  },
  async createTicket (root, { input }) {
    return await Ticket
      .create(input)
  }
}

module.exports = mutations
