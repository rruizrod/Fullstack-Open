const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./api_helper')
const app = require('../app');
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    
    const blogObj = helper.initialBlogs
        .map(blog => new Blog(blog))

    const promiseArray = blogObj.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('Blog FORMAT Test', () => {

    test('Blogs are JSON', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('ID field exists in blogs', async () => {
        const blogs = await helper.blogsInDb()
        
        blogs.forEach(blog => expect(blog.id).toBeDefined())
    })
})

describe('Blog ID operations', () => {
    test('GET by ID works', async () => {
        const blogs = await helper.blogsInDb()
        
        const newBlog = await api.get(`/api/blogs/${blogs[0].id}`)

        expect(newBlog.body.title).toEqual(blogs[0].title)

    })

    test('PUT (update) by ID works', async () => {
        const initialBlogs = await helper.blogsInDb()

        const firstBlog = initialBlogs[0]
        firstBlog.likes++

        await api
                .put(`/api/blogs/${firstBlog.id}`)
                .send(firstBlog)
                .expect(200)
                .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await helper.blogsInDb()
        
        expect(blogsAtEnd[0].likes).toEqual(firstBlog.likes)

    })

    test('DELETE by ID works', async () => {
        const blogs = await helper.blogsInDb()

        const blogToDel = blogs[0]

        await api
                .delete(`/api/blogs/${blogToDel.id}`)
                .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        
        expect(blogsAtEnd).toHaveLength(blogs.length - 1)

        const title = blogsAtEnd.map(blog => blog.title)

        expect(title).not.toContain(blogs[0].title)
    })
})

describe('Blog ADD Tests', () => {
    test('Can add blog', async () => {
        const newBlog = {
            title: 'Hilo',
            author: 'Ricardo Ruiz',
            url: 'localhost',
            userId: '5fefb25cde09d026f7057abe'
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

    test('Blog with no likes specified default to 0', async () => {
        const newBlog = {
            title: 'Hilo',
            author: 'Ricardo Ruiz',
            url: 'localhost',
            userId: '5fefb25cde09d026f7057abe'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect("Content-Type", /application\/json/)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
    })

    test('Empty Blog returns 400 and not added', async () => {
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
})

afterAll(() => {
    mongoose.connection.close()
})