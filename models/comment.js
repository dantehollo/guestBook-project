const { ObjectId } = require('mongoose')
const mongoose = require('./connection.js')

// Schema
const CommentSchema = new mongoose.Schema({
    commentText: String,
    userName: String,
    timeStamp: {
        type: Date,
        default: Date.now
    },
    postId: ObjectId
})

// collection
const CommentCollection = new mongoose.model('Comment', CommentSchema)

// get all
const getAllComments = () => {
    return CommentCollection.find({})
}

// get one
const getOneComment = (id) => {
    return CommentCollection.findById(id)
}

// create
const createNewComment = (commentData) => {
    return CommentCollection.create(commentData)
}

// update
const updateComment = (id, commentData) => {
    return CommentCollection.updateOne({_id: id}, commentData)
}

// delete
const deleteComment = (id) => {
    return CommentCollection.deleteOne({_id: id})
}

module.exports = {
    getAllComments,
    getOneComment,
    createNewComment,
    updateComment,
    deleteComment
}