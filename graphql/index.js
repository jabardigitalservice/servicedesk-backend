const { ApolloServer } = require('apollo-server');
const schema = require('./schema')

const graphQLServer = new ApolloServer({
  schema
});

module.exports = graphQLServer
