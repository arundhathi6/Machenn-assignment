const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

exports.getUserById = async (req, res) => {
    const userId = req.params.userId; // Extract user ID from the request parameters
    try {
      const user = await User.findById(userId);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch the user' });
    }
  };

exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { dob } = req.body;
        const {username}=req.body;
        const {email}=req.body
        await User.findByIdAndUpdate(userId, { dob:dob,username,email });
        res.status(200).json({ message: 'User role updated' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user role' });
    }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

exports.resetPassword = async (req, res) => {
    try {
        const { userId } = req.params;
        const { newPassword } = req.body;
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        console.log('hashedPassword:', hashedPassword)
        await User.findByIdAndUpdate(userId, { password: hashedPassword });
        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to reset password' });
    }
};


