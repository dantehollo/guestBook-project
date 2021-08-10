
const { ObjectId } = require('mongoose')
const mongoose = require('./connection.js')

// Schema
const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    originalPoster: ObjectId,
    timeStamp: {
        type: Date,
        default: Date.now
    }
})

// collection
const PostCollection = new mongoose.model('Post', PostSchema)

// get all
const getAllPosts = () => {
    return PostCollection.find({})
}

// get all posts by userId
const getAllPostsByUserId = (userId) => {
    return PostCollection.find({userId: userId})
}

// get one
const getOnePost = (id) => {
    return PostCollection.findById(id)
}

// create
const createNewPost = (postData) => {
    return PostCollection.create(postData)
}

// update
const updatePost = (id, postData) => {
    return PostCollection.updateOne({_id: id}, postData)
}

// delete
const deletePost = (id) => {
    return PostCollection.deleteOne({_id: id})
}

module.exports = {
    getAllPosts,
    getOnePost,
    createNewPost,
    updatePost,
    deletePost,
    getAllPostsByUserId
}
