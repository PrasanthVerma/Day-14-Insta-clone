const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload= multer({ storage: multer.memoryStorage() })
const identifyUser = require("../middlewares/auth.middleware")


postRouter.post("/create",upload.single("image"), identifyUser,postController.createPostController)
postRouter.get("/getAllPosts",identifyUser,postController.getPostController)
postRouter.get("/postDetails/:postId",identifyUser,postController.getPostDetailsController)

module.exports = postRouter