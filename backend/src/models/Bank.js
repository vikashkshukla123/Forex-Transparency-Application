const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    markupPercentage: {
        type: Number,
        required: true
    },

    fixedFee: {
        type: Number,
        required: true
    },

    atmWithdrawalFee: {
        type: Number,
        default: 0
    },

    rating: {
        type: Number,
        default: 4
    },

    network: {
        type: String,
        enum: ['VISA', 'MASTERCARD'],
        required: true
    }

}, { timestamps: true });

module.exports =
    mongoose.model('Bank', bankSchema);