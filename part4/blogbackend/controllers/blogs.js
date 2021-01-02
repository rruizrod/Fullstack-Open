const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

//--- HELPER FUNCTIONS ---
const getToken = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
      }
      return null
}

//--- ENDPOINT: Info about Blogs ---
blogsRouter.get('/info', (request, response) => {
    response.send("<h1>Blogs Info</h1>")
})

//--- ENDPOINT: Get all blogs ---
blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})

    response.json(blogs)
})
 
//--- ENDPOINT: Add a blog ---
blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const token = getToken(request)    
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!token || !decodedToken.id){
        return response.status(401).json({ error: 'Token Missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)

  
    if(!body.title && !body.url){
        response.status(400).end()
    }else{
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            user: user._id
        })

        if(!body.likes) blog.likes = 0

        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

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
blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        likes: body.likes,
        url: body.url
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})

    if(updatedBlog){
        response.json(updatedBlog)
    }else{
        response.status(404).end()
    }
})

//--- ENDPOINT: Delete blog by ID ---
blogsRouter.delete('/:id', async (request, response) => {
    const body = request.body

    const token = getToken(request)    
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!token || !decodedToken.id){
        return response.status(401).json({ error: 'Token Missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)

    if(blog.user.toString() !== user.id.toString()){
        return response.status(401).json({error: 'You are not authorized to delete this blog.'})
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = blogsRouter
