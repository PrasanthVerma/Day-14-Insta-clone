const userModel = require("../models/user.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")


async function registerController(req, res) {
    const { username, email, password, bio, profileImg } = req.body

    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { email },
            { username }
        ]
    })
    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: "User already Exists" + (isUserAlreadyExist.email == email ? " Email Already Exists" : " username already exists")
        })
    }
    const hash = crypto.createHash("sha256").update(password).digest("hex")
    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profileImg
    })
    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: "1hr" })
    res.cookie("token", token, { httpOnly: true })

    res.status(200).json({
        message: "User created successfully",
        username: user.username,
        email: user.email,
        bio: user.bio,
        profileImg: user.profileImg
    })
}

async function loginController(req, res) {
    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (!user) {
        return res.status(401).json({
            message: "User does not exists"
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex")

    const isPswdValid = hash === user.password

    if (!isPswdValid) {
        return res.status(401).json({
            message: "Invalid Password"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token, { httpOnly: true })

    res.status(200).json({
        message: "user Logged in successfully",
        username: user.username,
        email: user.email,
        bio: user.bio,
        profileImg: user.profileImg
    })
}

module.exports = {
    registerController,
    loginController
}