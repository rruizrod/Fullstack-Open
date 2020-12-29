const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./api_helper')
const app = require('../app');
const api = supertest(app)

const Blog = require('../models/blog')

describe('Blog API Test', () => {

    beforeEach(async () => {
        await Blog.deleteMany({})

        helper.initialBlogs.forEach(async (blog) => {
            let blogObject = new Blog(blog)
            await blogObject.save()
        })
    })

    test('Blogs are JSON', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('ID field exists', async () => {
        const blogs = await helper.blogsInDb()
        
        blogs.forEach(blog => expect(blog.id).toBeDefined())
    })

    test('Can add blog', async () => {
        const newBlog = {
            title: 'Hilo',
            author: 'Ricardo Ruiz',
            url: 'localhost'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect("Content-Type", /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).toContain(newBlog.title)
    })

    test('Test defaulting no likes to 0', async () => {
        const newBlog = {
            title: 'Hilo',
            author: 'Ricardo Ruiz',
            url: 'localhost'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect("Content-Type", /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
    })

    test('Test empty blog', async () => {
        const newBlog = {
            author: 'Ricardo',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
    
    afterAll(() => {
        mongoose.connection.close()
    })
})