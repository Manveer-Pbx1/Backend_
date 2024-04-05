const mongoose = require('mongoose');

// Schema
// Data modeling
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,

    },
    gender: {
        type: String,
    },
},
    {timestamps: true }) // shows createdAt and updatedAt

const User = mongoose.model("user", userSchema);