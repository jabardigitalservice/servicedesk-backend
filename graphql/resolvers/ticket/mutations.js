'use strict'

const Ticket = use('App/Models/Ticket')

const mutations = {
  async deleteTicket (root, { id }) {
    const toDelete = await Ticket.findOrFail(id)

    return await toDelete.delete()
  },
  async updateTicket (root, { id, input }) {
    const toUpdate = await Ticket.findOrFail(id)
    const data = {}
    data.title = input.title ? input.title : toUpdate.title
    data.description = input.description ? input.description : toUpdate.description
    data.category_id = input.category_id ? input.category_id : toUpdate.category_id
    data.status = input.status ? input.status : toUpdate.status

    await Ticket
      .query()
      .where('id', id)
      .update(data)

    return await Ticket.findOrFail(id)
  },
  async createTicket (root, { input }) {
    return await Ticket
      .create(input)
  }
}

module.exports = mutations
