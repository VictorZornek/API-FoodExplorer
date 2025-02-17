const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, 

    email: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        trim: true
    },

    isAdmin: {
        type: Boolean
    }
})

const User = mongoose.model('User', UserSchema)

module.exports = User;