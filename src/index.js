import { GraphQLServer } from "graphql-yoga"

// Type definitions (schema)
const typeDefs = `
  type Query {
    add(a: Float!, b: Float!): Float!
    greeting(name: String, position: String): String!
    me: User!
    post: Post!
  }

  type User {
    id:ID!
    name: String!
    email: String!
    age: Int

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
    add(parent, args, ctx, info){
      return args.a + args.b
    },
    greeting(parent, args, ctx, info) {
      if (args.name) return `Hello ${args.name}! You are my ${args.position}`
      else return "Hello!"
    },
    me() {
      return {
        id: "12321312",
        name: "Sanuja",
        email: "sadasd@live.com"
      }
    },
    post() {
      return {
        id: "123123",
        title: "Lord of the Rings",
        body: "Return of the King",
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
