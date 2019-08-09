import { GraphQLServer } from "graphql-yoga"

// Type definitions (schema)
// Query name hello always returns a strign because of !
const typeDefs = `
type Query {
    hello: String!  
    name: String!
    location: String!
    bio: String!
}
`
const resolvers = {
  Query: {
    hello() {
      return "This is my first query!"
    },
    name() {
      return "My name is Sanuja"
    },
    location() {
      return "I live in Sri Lanka"
    },
    bio() {
      return "I am the chosen one"
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => {
  console.log("The server is up")
})
