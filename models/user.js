
const mongoose = require('./connection.js')

// Schema
const UserSchema = new mongoose.Schema({
    userName: String,
    passWord: String,
})

// collection
const UserCollection = new mongoose.model('User', UserSchema)

// get all
const getAllUsers = () => {
    return UserCollection.find({})
}

// get one
const getOneUser = (id) => {
    return UserCollection.findById(id)
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
}
