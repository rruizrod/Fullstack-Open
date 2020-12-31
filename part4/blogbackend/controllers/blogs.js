const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//--- ENDPOINT: Info about Blogs ---
blogsRouter.get('/info', (request, response) => {
    response.send("<h1>Blogs Info</h1>")
})

//--- ENDPOINT: Get all blogs ---
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})

    response.json(blogs.map(blog => blog.toJSON()))
})
 
//--- ENDPOINT: Add a blog ---
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

//--- ENDPOINT: Get blog by ID ---
blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
   
    if(blog){ 
        response.json(blog)
    }else{
        response.status(404).end()
    }
})

//--- ENDPOINT: Update blog by ID ---
blogsRouter.put('/:id', async () => {
    
})

//--- ENDPOINT: Delete blog by ID ---
blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter
