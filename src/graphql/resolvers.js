const { Authors, Books } = require("../db/index")

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
