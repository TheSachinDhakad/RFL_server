const express = require("express");

const {
  loginController,
  registerController,
} = require("../Controllers/userController");
const {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../Controllers/userCrud");

const Router = express.Router();

Router.post("/login", loginController);
Router.post("/register", registerController);
Router.get("/users", getAllUsers);
Router.get("/users/:id", getUserById);
Router.put("/users/:id", updateUserById);
Router.delete("/users/:id", deleteUserById);

module.exports = Router;
