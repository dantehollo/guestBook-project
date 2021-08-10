const express = require('express')

const commentApi = require('../models/comment.js')

const commentRouter = express.Router()

// get all
commentRouter.get('/', (req, res) => {
  commentApi.getAllComments()
    .then((allComments) => {
      res.json(allComments)
  })
})

// get one
commentRouter.get('/:id', (req, res) => {
  commentApi.getOneComment(req.params.id)
    .then((oneComment) => {
      res.json(oneComment)
    })
})

commentRouter.get('/new/:postId', (req, res) => {
  res.json({userId : req.params.companyId})
})


// create
commentRouter.post('/', (req, res) => {
  commentApi.createNewComment(req.body)
    .then((newComment) => {
      res.json(newComment)
    })
})

// update
commentRouter.put('/:id', (req, res) => {
  commentApi.updateComment(req.params.id, req.body)
    .then((updatedComment) =>{
      res.json(updatedComment)
    })
})

// delete
commentRouter.delete('/:id', (req, res) => {
  commentApi.deleteComment(req.params.id)
    .then((deletedComment) => {
      res.json(deletedComment)
    })
})

module.exports = {
  commentRouter
}
