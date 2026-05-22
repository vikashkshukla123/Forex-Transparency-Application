const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },

    preferredCurrency: {
        type: String,
        default: "USD"
    },

    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);