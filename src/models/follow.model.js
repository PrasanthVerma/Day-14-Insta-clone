const mongoose = require("mongoose")


const followSchema = new mongoose.Schema({
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userdatas",
        required: [true, "Follower is required"],

    },
    followee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userdatas",
        required: [true, "Followee is required"],

    }
})

const followModel = mongoose.model("follows", followSchema)

module.exports = followModel