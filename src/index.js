import { GraphQLServer } from "graphql-yoga"

// Demo Data
const users = [
  {
    id: "1",
    name: "Sanuja",
    email: "sanuja@example.com",
    age: 27
  },
  {
    id: "2",
    name: "Sarah",
    email: "sarah@example.com"
  },
  {
    id: "3",
    name: "Mike",
    email: "mike@example.com",
    age: 13
  }
]

const posts = [
  {
    id: "1",
    title: "Lord of the Rings",
    body: "Best Book",
    published: true
  },
  {
    id: "2",
    title: "Harry Potter",
    body: "Ok Book",
    published: true
  },
  {
    id: "3",
    title: "The Hobbit",
    body: "Brilliant Book",
    published: false
  }
]

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
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
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users
      }
      return users.filter(user => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    posts(parent, args, ctx, info){
      if (!args.query) {
        return posts
      }
      return posts.filter(post => {
        return post.title.toLowerCase().includes(args.query.toLowerCase())
      })
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
