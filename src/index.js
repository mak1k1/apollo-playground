const { ApolloServer } = require("apollo-server-express")
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core")
const express = require("express")
const http = require("http")

const {typeDefs, resolvers } = require('./graphql')

const app = express()
const httpServer = http.createServer(app)
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})
server.start().then(res =>{
    server.applyMiddleware({ app, path: "/graphql" })
    app.listen(4000, ()=> {
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    })
})




