const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./api_helper')
const app = require('../app');
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    
    const usersObj = helper.initialUsers
        .map(user => new User(user))

    const promiseArray = usersObj.map(user => user.save())
    await Promise.all(promiseArray)
})

describe("User ADD Tests", () => {
    test('Adding ONE User', async () => {
        const newUser = {
            name: "Apollo",
            username: "Apollo",
            password: "iliketreats"
        }

        await api
                .post('/api/users')
                .send(newUser)
                .expect(200)
                .expect("Content-Type", /application\/json/)

        const users = await helper.usersInDb()

        expect(users).toHaveLength(helper.initialUsers.length + 1)
    })
})