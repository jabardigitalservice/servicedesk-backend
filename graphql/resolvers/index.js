const categoryResolvers = require('./category')
const ticketResolvers = require('./ticket')

const resolvers = {
  Query: {
    ...categoryResolvers.queries,
    ...ticketResolvers.queries
  },
  Mutation: {
    ...categoryResolvers.mutations,
    ...ticketResolvers.mutations
  },
  Ticket: {
    ...ticketResolvers.ticket
  }
}

module.exports = resolvers
