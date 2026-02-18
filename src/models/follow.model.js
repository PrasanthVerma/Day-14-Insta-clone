const mongoose = require("mongoose")


const followSchema = new mongoose.Schema({
    // store usernames instead of ObjectId references
    follower: {
        type: String,
        required: [true, "Follower username is required"],
    },
    followee: {
        type: String,
        required: [true, "Followee username is required"],
    }
}, {
    timestamps: true
})

const followModel = mongoose.model("follows", followSchema)

module.exports = followModel