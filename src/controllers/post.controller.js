const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")


const imageKit = new ImageKit({
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY
})

async function createPostController(req, res) {
    // const { caption, imageURL } = req.body

    console.log(req.body, req.file)

    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access"
        })
    }
    let decoded = null
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    }
    catch (err) {
        return res.status(401).json({
            message: "unauthorized Access"
        })
    }

    if (!req.file) {
        return res.status(400).json({ message: "Image file is required" })
    }

    const file = await imageKit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: req.file.originalname || "upload",
    });

    // use the correct url property returned by ImageKit
    const imageURL = file.url || file.filePath || file.imageURL

    const post = await postModel.create({
        caption: req.body.caption,
        imageURL,
        user: decoded.id
    })

    res.status(200).json({
        message: "Post created",
        post
    })
}

module.exports = {
    createPostController
}