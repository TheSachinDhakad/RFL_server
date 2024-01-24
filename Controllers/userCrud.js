const User = require("../models/userModel");

// Create a new user
// const createUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const newUser = new User({ name, email, password });
//     const savedUser = await newUser.save();
//     res.status(201).json(savedUser);
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a specific user by ID
const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a user by ID
const updateUserById = async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
