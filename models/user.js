const mongoose = require('mongoose');
const path = require('path');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    salt:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    profileImageUrl:{
        type: String,
        default: "/images/default.png",

    },
    role:{
        type: String,
        enum:["USER", "ADMIN"],
        default: "USER"
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
},{
    timestamps: true
})

const user = mongoose.model('user', userSchema)

module.exports = {user}