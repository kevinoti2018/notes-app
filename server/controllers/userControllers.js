const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utill/generateToken");
const encryptionUtil = require("../utill/encryptionUtil");
const bcrypt = require("bcrypt");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(409).json({ message: "User already exists" });
  }

  const { salt, encryptedPassword } = await encryptionUtil.encryptPassword(
    password
  );

  const user = new User({
    name,
    email,
    password: encryptedPassword,
    pic,
    salt,
  });
  await user.save();

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(500).send({ error: "Error occured" });
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }, "_id name isAdmin pic").select(
    "+password"
  );

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const isValidPassword = await encryptionUtil.comparePassword(
    password,
    user.salt,
    user.password
  );

  if (!isValidPassword) {
    res.json({
      _id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).send({ error: "Incorrect password" });
  }
});

module.exports = { registerUser, authUser };
