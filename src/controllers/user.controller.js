const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")


async function followUserController(req,res){
    try{
        const followerUsername = req.user.username
        const followeeUsername = req.params.username

        if(followerUsername === followeeUsername){
            return res.status(400).json({message: "You cannot follow yourself"})
        }

        const followerUser = await userModel.findOne({ username: followerUsername }).select("-password -__v")
        const followeeUser = await userModel.findOne({ username: followeeUsername }).select("-password -__v")

        if(!followeeUser){
            return res.status(404).json({message: "User to follow not found"})
        }

        const existing = await followModel.findOne({ follower: followerUsername, followee: followeeUsername })
        if(existing){
            return res.status(400).json({message: "Already following this user"})
        }

        const createdFollow = await followModel.create({ follower: followerUsername, followee: followeeUsername })

        return res.status(201).json({
            message: "Follow created",
            follow: createdFollow,
            follower: followerUser,
            followee: followeeUser
        })

    }catch(err){
        return res.status(500).json({message: err.message})
    }

}


module.exports = {
    followUserController
}