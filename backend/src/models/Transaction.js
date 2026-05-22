const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    bankId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bank",
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    currency: {
        type: String,
        required: true
    },

    exchangeRate: {
        type: Number,
        required: true
    },

    finalAmount: {
        type: Number,
        required: true
    },

    savings: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        enum: ["SUCCESS", "FAILED", "PENDING"],
        default: "SUCCESS"
    },

    breakdown: {
        baseAmount: Number,
        markupAmount: Number,
        fee: Number
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Transaction", transactionSchema);