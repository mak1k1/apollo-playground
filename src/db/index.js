const mongoose = require('mongoose')
const authorSchema = require('./schema/authorSchema.js')
const bookSchema = require('./schema/bookSchema.js')

mongoose.connect('mongodb://makiki:kokot123@cluster0-shard-00-00.9kxit.mongodb.net:27017,cluster0-shard-00-01.9kxit.mongodb.net:27017,cluster0-shard-00-02.9kxit.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-cjzqjn-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

let db = mongoose.connection
db.on('error', (err) => {
    console.error("Error while connecting to database: ", err.message);
})

const Books = mongoose.model('Books', bookSchema)
const Authors = mongoose.model('Authors', authorSchema)

module.exports = {Books, Authors}