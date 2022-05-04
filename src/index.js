const { ApolloServer, gql } = require("apollo-server-express")
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core")
const express = require("express")
const http = require("http")

const startApolloServer = async (typeDefs, resolvers) => {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  await server.start()
  server.applyMiddleware({ app })
  await new Promise(resolve => httpServer.listen({port: 4000}, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
]

const resolvers = {
  Query: {
    books: () => books,
  },
}

startApolloServer(typeDefs, resolvers)