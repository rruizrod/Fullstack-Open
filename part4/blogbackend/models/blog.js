const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    url: String,
    title: String,
    author: String,
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User'
    }
  })

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog