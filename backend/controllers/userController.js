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

export { authUser };
