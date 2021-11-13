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

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

module.exports = schema
