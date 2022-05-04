const books = [
  {
    id: 1,
    title: "The Awakening",
    author: { id: 1, name: "Kate Chopin" },
  },
  {
    id: 2,
    title: "City of Glass",
    author: { id: 1, name: "Paul Auster" },
  },
]

const resolvers = {
  Query: {
    books: () => books,
  },
  Mutation: {
    addAuthor: (root, {input}) => {
      return {
      code: '200',
      success: true,
      message: 'Author created successfully',
      author: {id: 3, name: input.name}}
    },
    addBook: (title) => {
      return {
        code: '200',
        success: true,
        message: 'Je to v pici drahi veriaci',
        book: {id: 3, title: title}}   
    },
  }
}

module.exports = resolvers
