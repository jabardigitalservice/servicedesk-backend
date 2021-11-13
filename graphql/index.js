const { ApolloServer } = require('apollo-server');
const resolvers = require('./resolvers')
const { join } = use('path');
const { readdirSync, readFileSync } = use('fs');
const gqlFiles = readdirSync(join(__dirname, './typedefs'));

let typeDefs = '';

gqlFiles.forEach((file) => {
  typeDefs += readFileSync(join(__dirname, './typedefs', file), {
    encoding: 'utf8',
  });
});

const graphQLServer = new ApolloServer({
  typeDefs,
  resolvers,
});

module.exports = graphQLServer
