const express = require("express")
const userRouter = express.Router()
const userController = require("../controllers/user.controller") 
const identifyUser= require("../middlewares/auth.middleware")

userRouter.post("/follow/:username",identifyUser,userController.followUserController)

module.exports = userRouter