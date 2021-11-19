'use strict'

const Ticket = use('App/Models/Ticket')

const mutations = {
  async deleteTicket (root, { id }, context) {
    const toDelete = await Ticket.findOrFail(id)

    return await toDelete.delete()
  },
  async updateTicket (root, { id, input }) {
    return await Ticket
      .query()
      .where('id', id)
      .update(input)
  },
  async openTicket (root, { input }) {
    return await Ticket
      .create(input)
  }
}

module.exports = mutations
