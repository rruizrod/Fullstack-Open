const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/info', (request, response) => {
    response.send("<h1>Blogs Info</h1>")
})

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})

    response.json(blogs.map(blog => blog.toJSON()))
})
  
blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
  
    if(!blog.title && !blog.url){
        response.status(400).end()
    }else{
        if(!blog.likes) blog.likes = 0

        const savedBlog = await blog.save()

        response.json(savedBlog)
    }
})

module.exports = blogsRouter