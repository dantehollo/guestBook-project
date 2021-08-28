
const mongoose = require('./connection.js')

// Schema
const UserSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    password: {type: String, required: true},
    passwordVerify: {type: String, required: true},
    email: {type: String, required: true}
})

// collection
const UserCollection = new mongoose.model('User', UserSchema)
const User = mongoose.model('user', UserSchema)

// get all
const getAllUsers = () => {
    return UserCollection.find({})
}

// get one
const getOneUser = (id) => {
    return UserCollection.findById(id)
}

// get one by email
const getByEmail = (email) => {
    return UserCollection.findOne(email)
}

// create
const createNewUser = (userData) => {
    return UserCollection.create(userData)
}

// update
const updateUser = (id, userData) => {
    return UserCollection.updateOne({_id: id}, userData)
}

// delete
const deleteUser = (id) => {
    return UserCollection.deleteOne({_id: id})
}

module.exports = {
    getAllUsers,
    getOneUser,
    createNewUser,
    updateUser,
    deleteUser,
    getByEmail
}
