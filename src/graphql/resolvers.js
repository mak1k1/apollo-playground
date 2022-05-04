const books = [
  {
    title: "The Awakening",
    author: { name: "Kate Chopin" },
  },
  {
    title: "City of Glass",
    author: { name: "Paul Auster" },
  },
]

const resolvers = {
  Query: {
    books: () => books,
  },
}

module.exports = resolvers
