const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload= multer({ storage: multer.memoryStorage() })

postRouter.post("/create",upload.single("image"), postController.createPostController)
postRouter.get("/getAllPosts",postController.getPostController)
postRouter.get("/postDetails/:postId")

module.exports = postRouter