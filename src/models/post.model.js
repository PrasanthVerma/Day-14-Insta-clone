const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imageURL:{
        type:String,
        required:[true,"Image url is required to create a post"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userdatas",
        required:[true,"User id is required to create a post"]
    }
})

const postModel = mongoose.model("posts",postSchema)

module.exports = postModel