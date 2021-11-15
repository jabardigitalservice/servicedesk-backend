const categoryResolvers = require('./category')

// const { categoryQueries } = require('./category')
const resolvers = {
  Query: {
    ...categoryResolvers.queries
  },
  Mutation: {
    ...categoryResolvers.mutations
  }
}

module.exports = resolvers
