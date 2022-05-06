const { Authors, Books } = require('../db/index')

const resolvers = {
  Query: {
    books: async () => await Books.find({}),
    authors: async () => await Authors.find({}),
  },
  Mutation: {
    addAuthor: async (_, {input}) => {
      try {
        const author = await Authors.create({name: input.name})
        return {
          code: '200',
          success: true,
          message: 'Author created successfully',
          author: {id: author.id, name: author.name}
        }        
      }
      catch(err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          author: null
        }
      }
    },
    addBook: (_, {input}) => {
      return {
        code: '200',
        success: true,
        message: 'Je to v pici drahi veriaci',
        book: {id: 3, title: input.title}}   
    },
  }
}

module.exports = resolvers
