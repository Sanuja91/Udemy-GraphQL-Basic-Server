import { GraphQLServer } from "graphql-yoga"

// Type definitions (schema)
// rating has no ! hence can return null
const typeDefs = `
  type Query {
    title: String!
    price: Float!
    releaseYear: Int!
    rating: Int
    inStock: Boolean!
  }
`
const resolvers = {
  Query: {
    title() {
      return "Lord of the Rings"
    },
    price() {
      return 200.5
    },
    releaseYear() {
      return 2005
    },
    rating() {
      return 100
    },
    inStock() {
      return false
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
