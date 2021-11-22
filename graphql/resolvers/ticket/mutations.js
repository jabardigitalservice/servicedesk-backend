'use strict'

const Ticket = use('App/Models/Ticket')

const mutations = {
  async deleteTicket (root, { id }) {
    const toDelete = await Ticket.findOrFail(id)

    return await toDelete.delete()
  },
  async updateTicket (root, { id, input }) {
    const toUpdate = await Ticket.findOrFail(id)
    let data = {}
      !input.title ? data.title = toUpdate.title : data.title = input.title
      !input.description ? data.description = toUpdate.description : data.description = input.description
      !input.category_id ? data.category_id = toUpdate.category_id : data.category_id = input.category_id
      !input.status ? data.status = toUpdate.status : data.status = input.status

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
