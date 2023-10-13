const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body
  console.log(req.body)
  try {

    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token, _id: user._id})
  } catch (error) {
    console.log(error.message)
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {

  const {username, email, password} = req.body

  try {
    const user = await User.signup(username, email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({token, email: user.email, _id: user._id})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// get a single workout
const getUsers = async (req, res) => {

  const users = await User.find({}).sort({createdAt: -1})

  res.status(200).json(users)
}

// get a single workout
const getUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }

  const user = await User.findById(id)

  if (!user) {
    return res.status(404).json({error: 'No such user'})
  }
  
  res.status(200).json(user)
}

// update a workout
const updateUser = async (req, res) => {
  const { id } = req.params

  const {email, username} = req.body 
  console.log(req.body)
  let emptyFields = []

  if(!email) {
    emptyFields.push('email')
  }
  if(!username) {
    emptyFields.push('username')
  }

  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such user'})
  }

  const user = await User.findByIdAndUpdate({_id: id}, {email, username}, { new: true })

  if (!user) {
    return res.status(400).json({error: 'No such user'})
  }

  res.status(200).json(user)
}

module.exports = { signupUser, loginUser, getUsers, getUser, updateUser }