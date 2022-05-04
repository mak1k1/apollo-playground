const { gql } = require("apollo-server-express")

const typeDefs = gql`
  type Book {
    title: String
    author: Author
  }
  type Author {
      name: String
      books: [Book]
  }

  type Query {
    books: [Book]
  }
`

module.exports = typeDefs