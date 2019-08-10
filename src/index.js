import { GraphQLServer } from "graphql-yoga"

// Demo Data
const users = [
  {
    id: "1",
    name: "Sanuja",
    email: "sanuja@example.com",
    age: 27,
    posts: ["1"]
  },
  {
    id: "2",
    name: "Sarah",
    email: "sarah@example.com",
    posts: ["2"]
  },
  {
    id: "3",
    name: "Mike",
    email: "mike@example.com",
    age: 13,
    posts: ["3"]
  }
]

const posts = [
  {
    id: "1",
    title: "Lord of the Rings",
    body: "Best Book",
    published: true,
    author: "1",
    comments: ["4"]
  },
  {
    id: "2",
    title: "Harry Potter",
    body: "Ok Book",
    published: true,
    author: "2",
    comments: ["5"]
  },
  {
    id: "3",
    title: "The Hobbit",
    body: "Brilliant Book",
    published: false,
    author: "3",
    comments: ["6"]
  }
]

const comments = [
  {
    id: "4",
    text: "COMMENT Lord of the Rings",
    author: "1",
    post: "1"
  },
  {
    id: "5",
    text: "COMMENT Harry Potter",
    author: "2",
    post: "2"
  },
  {
    id: "6",
    text: "COMMENT The Hobbit",
    author: "3",
    post: "3"
  }
]

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
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
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts
      }
      return posts.filter(post => {
        return post.title.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    comments(parent, args, ctx, info) {
      return comments
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
  },

  // Creating relationships
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author
      })
    },
    comments(parent, args, ctx, info){
      return comments.filter(comment => {
        return comment.post === parent.id
      })
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        return post.author === parent.id
      })
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.author === parent.id
      })
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author
      })
    },
    post(parent, args, ctx, info) {
      return posts.find(post => {
        return post.id === parent.post
      })
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
