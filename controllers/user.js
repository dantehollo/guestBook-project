
const express = require('express')
const bcrypt = require('bcrypt')

const userApi = require('../models/user.js')

const userRouter = express.Router()

// get all
userRouter.get('/', (req, res) => {
  userApi.getAllUsers()
    .then((allUsers) => {
      res.json(allUsers)
  })
})

// get one
userRouter.get('/:id', (req, res) => {
  userApi.getOneUser(req.params.id)
    .then((oneUser) => {
      res.json(oneUser)
    })
})

// create
userRouter.post('/', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.passWord, 10)
  req.body.passWord = hashedPassword
  userApi.createNewUser(req.body)
    .then((newUser) => {
      res.json(newUser)
    })
})

// update
userRouter.put('/:id', (req, res) => {
  userApi.updateUser(req.params.id, req.body)
    .then((updatedUser) =>{
      res.json(updatedUser)
    })
})

// delete
userRouter.delete('/:id', (req, res) => {
  userApi.deleteUser(req.params.id)
    .then((deletedUser) => {
      res.json(deletedUser)
    })
})

// user authentication
userRouter.get('/login', async (req, res) => {
  const user = users.find(user => user.userName === req.body.userName)
  if (user == null) {
    return res.status(400).send('Cannont find user')
  }
  try {
    if(await bcrypt.compare(req.body.passWord, user.passWord)){
      res.send('Success')
    } else {
      res.send('Wrong Password or Username')
    }
  } catch {
    res.status(500).send()
  }
})

module.exports = {
  userRouter
}
