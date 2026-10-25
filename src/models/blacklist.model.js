const mongoose = require("mongoose");

const tokenBlacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [ true, "token is required to blacklist"],
        unique: [ true, "token is already blacklisted"]
    }
}, {
    timestamps: true
})

tokenBlacklistSchema.index({ createdAt: 1}, {
    expireAfterSeconds: 60*60*24*3 //3 days
})

const tokenBlacklistModel = mongoose.model("tokenBlacklist", tokenBlacklistSchema);

module.exports = tokenBlacklistModel;