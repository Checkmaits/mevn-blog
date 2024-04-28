const User = require("../models/user.model");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function getUser(req, res, next) {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid user ID ❌");
    error.status = 400;
    return next(error);
  }

  try {
    const user = await User.findById(id).select("username email createdAt posts");
    if (!user) {
      const error = new Error("User not found ❌");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      message: "User retrieved successfully ✅",
      data: user,
    });
  } catch (error) {
    console.error(error); // for debugging
    next(new Error());
  }
}

async function loginUser(req, res, next) {
  const { email, password } = req.body;

  const missingFields = [];
  if (!email) missingFields.push("email");
  if (!password) missingFields.push("password");
  if (missingFields.length > 0) {
    const error = new Error(`Missing required data: [${missingFields.join(",")}] ❌`);
    error.status = 400;
    return next(error);
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("Invalid email or password ❌");
      error.status = 400;
      return next(error);
    }

    const doesPasswordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!doesPasswordMatch) {
      const error = new Error("Invalid email or password ❌");
      error.status = 400;
      return next(error);
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({
      message: "User logged in successfully ✅",
      data: {
        token,
        userId: user.id,
      },
    });
  } catch (error) {
    console.error(error);
    next(new Error());
  }
}

async function createUser(req, res, next) {
  const { username, email, password } = req.body;

  const missingFields = [];
  if (!username) missingFields.push("username");
  if (!email) missingFields.push("email");
  if (!password) missingFields.push("password");
  if (missingFields.length > 0) {
    const error = new Error(`Missing required data: [${missingFields.join(",")}] ❌`);
    error.status = 400;
    return next(error);
  }

  try {
    const doesUserExist = await User.findOne({ $or: [{ username: username }, { email: email }] });
    if (doesUserExist) {
      const error = new Error("A user with those credentials already exists ❌");
      error.status = 409;
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, email, passwordHash: hashedPassword });
    await user.save();
    res.status(201).json({ message: `User created successfully (ID: ${user.id}) ✅` });
  } catch (error) {
    console.error(error);
    next(new Error());
  }
}

async function updateUser(req, res, next) {
  const { username, email, password } = req.body;

  const missingFields = [];
  if (!username) missingFields.push("username");
  if (!email) missingFields.push("email");
  if (!password) missingFields.push("password");
  if (missingFields.length > 0) {
    const error = new Error(`Missing required data: [${missingFields.join(",")}] ❌`);
    error.status = 400;
    return next(error);
  }

  try {
    const doesUserExist = await User.findOne({ $or: [{ username: username }, { email: email }] });
    if (doesUserExist) {
      const error = new Error("Those credentials already belong to another user ❌");
      error.status = 409;
      return next(error);
    }

    const user = await User.findByIdAndUpdate(req.userId, { username, email, password });
    if (!user) {
      const error = new Error("User not found ❌");
      error.status = 404;
      return next(error);
    }

    res.status(201).json({ message: `User updated successfully (ID: ${user.id}) ✅` });
  } catch (error) {
    console.error(error);
    next(new Error());
  }
}

module.exports = { getUser, loginUser, createUser, updateUser };
