const categoryQueries = require('./category')

// const { categoryQueries } = require('./category')
const resolvers = {
  Query: {
    ...categoryQueries
  }
}

module.exports = resolvers
