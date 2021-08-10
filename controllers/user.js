
const express = require('express')

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
userRouter.post('/', (req, res) => {
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

module.exports = {
  userRouter
}
