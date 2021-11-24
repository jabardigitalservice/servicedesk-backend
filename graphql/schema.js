'use strict'
const { constraintDirective, constraintDirectiveTypeDefs } = use('graphql-constraint-directive')
const { join } = use('path')
const { readdirSync, readFileSync } = use('fs')
const { makeExecutableSchema } = use('@graphql-tools/schema')
const resolvers = use('./resolvers')

const gqlFiles = readdirSync(join(__dirname, './typedefs'))

let typeDefs = ''

gqlFiles.forEach((file) => {
  typeDefs += readFileSync(join(__dirname, './typedefs', file), {
    encoding: 'utf8'
  })
})

let schema = makeExecutableSchema({
  typeDefs: [
    typeDefs,
    constraintDirectiveTypeDefs
  ],
  resolvers,
  schemaDirectives: {
    constraint: constraintDirective
  }
})
schema = constraintDirective()(schema)

module.exports = schema
