import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import asyncHandler from 'express-async-handler';

// @desc  Auth user & get token
// @route POST /api/user
// @access Public
const authUser = asyncHandler(async (req, res) => {
  //access data from req.body
  const { email, password } = req.body;

  //find user by matching email
  const user = await User.findOne({ email });

  //check if the User exist and match passwords (create method in a User model)
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc  Regiser a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  //access data from req.body
  const { name, email, password } = req.body;

  //find user by matching email
  const existinguser = await User.findOne({ email });
  //if user alerady exists, throw an error
  if (existinguser) {
    res.status(401);
    throw new Error('User already exists');
  }
  //crete a new user
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error('Invalid user data');
  }
});

// @desc  Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { authUser, getUserProfile, registerUser };
