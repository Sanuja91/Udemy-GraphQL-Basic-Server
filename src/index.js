import { GraphQLServer } from "graphql-yoga"

// Type definitions (schema)
const typeDefs = `
  type Query {
    me: Post!
  }

  type Post {
    id:ID!
    title: String!
    body: String!
    published: Boolean!

  }
`
const resolvers = {
  Query: {
    me() {
      return{
        id:'123123',
        title:'Lord of the Rings',
        body:'Return of the King',
        published: false
      }
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
