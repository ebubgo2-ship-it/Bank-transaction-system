const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema({
    fromAccount: {
        type:
        mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [ true, "transaction must be associated with a from account"],
        index: true
    },
    toAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [ true, "transaction must be associated with a to account"],
        index: true
    },
    status: {
        type: String,
        enum: {
            values: [ "PENDING", "COMPLETED", "FAILED", "REVERSED"],
            message: "status can be either PENDING, COMPLETED, FAILED or REVERSED",
        },
        default: "PENDING"
    },
    amount: {
        type: Number,
        required: [ true, "amount is required for creating a transaction"],
        min: [0, "transaction amount cannot be negative"]
    },
    idempotencyKey: {
        type: String,
        required: [ true, "idempotency key is required for creating a transction"],
        index: true,
        unique: true
    }
}, {
    timestamps: true
})

const transactionModel = mongoose.model("transaction", transactionSchema)

module.exports = transactionModel