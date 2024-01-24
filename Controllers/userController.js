const express = require("express");
const UserModel = require("../models/userModel");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../Config/generateToken");

// login controller methods
const loginController = expressAsyncHandler(async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await UserModel.findOne({ name });

    if (user && (await user.matchPassword(password))) {
      const response = {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      };

      console.log(response);
      res.json(response);
    } else {
      res.json({ error: "Invalid username or password" });
    }
  } catch (error) {
    res.json({ error: "invalid credentials" });
  }
});

// register controller methods
const registerController = expressAsyncHandler(async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check all parameters
    if (!name || !email || !password) {
      res.json({ error: "Please enter a name or email and password" });
    }

    // check user already exists
    const userExist = await UserModel.findOne({ email });

    if (userExist) {
      // throw Error("User already exists");
      res.json({ error: "User already exists" });
    }

    // username already taken
    const userNameExist = await UserModel.findOne({ name });

    if (userNameExist) {
      // throw Error("Username already exists");
      res.json({ error: "Username already exists" });
    }

    // create entry in db

    const user = await UserModel.create({ name, email, password });

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id), // This is where the error occurs
      });
    } else {
      res.json({ error: "registration failed" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = { loginController, registerController };
