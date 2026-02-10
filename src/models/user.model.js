const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "User with this username already exists"],
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        unique: [true, "User with this email already exists"],
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    bio: String,
    profileImg: {
        type: String,
        default: "https://ik.imagekit.io/hnoglyswo0/avatar-gender-neutral-silhouette-vector-600nw-2470054311.webp"
    }

})

const userModel = mongoose.model("userData",userSchema)

module.exports = userModel