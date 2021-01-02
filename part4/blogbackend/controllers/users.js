const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

//--- ENDPOINT: Get Users List ---
usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1, id: 1})
    response.json(users)
})

//--- ENDPOINT: Create User ---
usersRouter.post('/', async (request, response) => {
    const body = request.body
    
    console.log(body)
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        name: body.name,
        username: body.username,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

//--- ENDPOINT: Delete User by ID ---
usersRouter.delete('/:id', async (request, response) => {
    await User.findByIdAndRemove(request.params.id)

    response.status(204).end()
})

module.exports = usersRouter