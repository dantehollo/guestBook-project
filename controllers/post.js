const express = require('express')

const postApi = require('../models/post.js')

const postRouter = express.Router()

// get all
postRouter.get('/', (req, res) => {
  postApi.getAllPosts()
    .then((allPosts) => {
      res.json(allPosts)
  })
})

// get one
postRouter.get('/:id', (req, res) => {
  postApi.getOnePost(req.params.id)
    .then((onePost) => {
      res.json(onePost)
    })
})

// get all by userId
postRouter.get('/new/:userId', (req, res) => {
  res.json({userId : req.params.userId})
})

// create
postRouter.post('/', (req, res) => {
  postApi.createNewPost(req.body)
    .then((newPost) => {
      res.json(newPost)
    })
})

// update
postRouter.put('/:id', (req, res) => {
  postApi.updatePost(req.params.id, req.body)
    .then((updatedPost) =>{
      res.json(updatedPost)
    })
})

// delete
postRouter.delete('/:id', (req, res) => {
  postApi.deletePost(req.params.id)
    .then((deletedPost) => {
      res.json(deletedPost)
    })
})

module.exports = {
  postRouter
}
