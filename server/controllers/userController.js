import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../model/userSchema.js'


// @desc get all user
// /route  POST /api/users/list
// @access Public
const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 })
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// @desc Auth or login user/set Token
// /route  POST /api/users/auth
// @access Public 
const authUser = asyncHandler(async (req, res) => {
    const { idNumber, password } = req.body

    const user = await User.findOne({ idNumber })

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            idNumber: user.idNumber,
            phoneNumber:user.phoneNumber
        })
    } else {
        res.status(401)
        throw Error('Invalid ID-Number or password')
    }

})

// @desc  Register new user
// route  POST /api/users
// @access Public 
const registerUser = asyncHandler(async (req, res) => {
    const { name, idNumber, password, phoneNumber } = req.body
    const userExists = await User.findOne({ idNumber: idNumber })

    if (userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    if (!phoneNumber) {
        res.status(400)
        throw new Error("Phone Number is required")
    }

    if (password.length < 6) {
        res.status(400)
        throw new Error("Password must be at least 6 charcters long")
    }

    const user = await User.create({
        name,
        idNumber,
        password,
        phoneNumber
    })

    if (user) {
        generateToken(res, user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            idNumber: user.idNumber,
            phoneNumber: user.phoneNumber
        })
    } else {
        res.status(400)
        throw Error('invalid user data')
    }
})

// @desc Logout user
// route  POST /api/users/logout
// @access Public 
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: "User Logout out" })
})

// @desc   Get user profile
// /route  GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {

    const user = {
        _id: req.user._id,
        name: req.user.name,
        idNumber: req.user.idNumber,
        phoneNumber: req.user.phoneNumber

    }
    res.status(200).json(user)
})



// @desc  Update 
// /route  POST /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.idNumber = req.body.idNumber || user.idNumber
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber

        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()
        res.status(201).json(updatedUser)
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

// @desc delete the user data
// /route DELETE /api/user
// @access Public 
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: `Deleted User` })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export {
    getAllUsers, authUser, registerUser,
    logoutUser, getUserProfile, updateUserProfile,
    deleteUser
}