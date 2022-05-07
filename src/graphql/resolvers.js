const { default: mongoose } = require("mongoose")
const { Authors, Books } = require("../db/index")
const { isString } = require('../helpers')

const resolvers = {
  Query: {
    books: async () => await Books.find({}),
    authors: async () => await Authors.find({}),
    book: async (_, { id }) => await Books.findById(id),
    author: async(_, { id }) => await Authors.findById(id),
  },
  Mutation: {
    addAuthor: async (_, { input }) => {
      try {
        const author = await Authors.create({ name: input.name })
        return {
          code: 200,
          success: true,
          message: "Author created successfully",
          author: { id: author.id, name: author.name },
        }
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          author: null,
        }
      }
    },
    addBook: async (_, { input }) => {
      try {
        const book = await Books.create({ title: input.title, author: null })
        const bookAuthor = await Authors.findById(input.author)
        book["author"] = input.author
        book.save()

        return {
          code: 200,
          success: true,
          message: "Book created successfully",
          book: { id: book.id, title: book.title, author: bookAuthor },
        }
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          author: null,
        }
      }
    },
    updateAuthor: async (_, { input }) => {
      try {
        if(!mongoose.Types.ObjectId.isValid(input.id)) {
          return {
            code: 400,
            success: false,
            message: "Wrong ID format",
            author: null
          }
        }
        const author = await Authors.findById(input.id)
        console.log(author)
        if(author === null) {
          return {
            code: 400,
            success: false,
            message: "Author not found",
            author: null
          }
        }
        if(input.name && isString(input.name)) {
          author.name = input.name
        }
        author.save()
        return {
          code: 200,
          success: true,
          message: "Author updated successfully",
          author: { id: author.id, name: author.name },
        }
      } catch (err) {
        console.log(err)
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          author: null,
        }
      }
    },
  },
  Book: {
    author: async ({ author }) => {
      return await Authors.findById(author)
    },
  },
  Author: {
    books: async({ id }) => {
      return await Books.find({author: id})
    }
  }
}

module.exports = resolvers
