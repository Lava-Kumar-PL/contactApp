const { Schema, model } = require('mongoose')

let userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    password: { type: String, required: true }
})

module.exports = model('user', userSchema, 'user')