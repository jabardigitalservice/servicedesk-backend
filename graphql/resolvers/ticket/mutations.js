'use strict'

const Ticket = use('App/Models/Ticket')

const mutations = {
  async deleteTicket (root, { id }, context) {
    const toDelete = await Ticket.findOrFail(id)

    return await toDelete.delete()
  }
}

module.exports = mutations
