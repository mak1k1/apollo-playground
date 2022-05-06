const { gql } = require("apollo-server-express")

const typeDefs = gql`
  type Book {
    id: ID!
    title: String
    author: Author
  }
  type Author {
      id: ID!
      name: String
      books: [Book]
  }

  type Query {
    books: [Book]
    authors: [Author]
    book(id: ID!): Book
    author: Author
  }

  input CreateAuthorInput {
    name: String!
    books: [ID]
  }

  input CreateBookInput {
    title: String!
    author: ID
  }

  type Mutation {
    addAuthor(input: CreateAuthorInput): AddAuthorMutationResponse
    addBook(input: CreateBookInput): AddBookMutationResponse
  }

  interface MutationResponse {
    code: Int!
    success: Boolean!
    message: String!
  }

  type AddBookMutationResponse implements MutationResponse {
    code: Int!
    success: Boolean!
    message: String!
    book: Book
  }

  type AddAuthorMutationResponse implements MutationResponse {
    code: Int!
    success: Boolean!
    message: String!
    author: Author
  }
`

module.exports = typeDefs