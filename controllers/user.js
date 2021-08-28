const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
  try {
    //hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    req.body.password = hashedPassword
    let newUser = userApi.createNewUser(req.body)

    //validation
    const { email, password, userName, passwordVerify} = req.body

    // all fields not filled
    if (!email || !password || !userName || !passwordVerify) {
      return res
      .status(400)
      .json({ errorMessage: "Please enter all fields" })
    }

    // password too short
    if (password.length < 8) {
      return res.status(400).json({
        errorMessage: "Passward needs to be at least eight characters",
      })
    } 

    // account already uses that email
    const existingUser = await userApi.getByEmail({ email })

    if (existingUser) {
      return res.status(400).send({
        errorMessage: "An account with this email already exists"
      })
    }
    
    //sign in token
    const token = jwt.sign({
      user: newUser._id
    },
    process.env.JWT_SECRET
    )
    
    // send token as cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    }).json(newUser)

  } catch (err) {
      res.status(500).send("catch")
  }
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
userRouter.post('/login', async (req, res) => {
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
    res.status(500).send('triggered the catch')
  }
})

let userListFromAPI = userApi.getAllUsers()
let userListFromRouter = userRouter.get('/', (req, res) => {
  userApi.getAllUsers()
    .then((allUsers) => {
      res.json(allUsers)
  })
})
// console.log(userListFromRouter)

module.exports = {
  userRouter
}
