const express = require("express");
const router = express.Router();
const {User} = require("../model/user.model.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email }).lean().exec();

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the entered password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' } // Token expiration time
    );

    // Send the token and the user's role
    return res.status(200).json({
      token,    // Return the JWT token
      role: user.role  // Return the user's role
    });

  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});
  
router.post('/add', async (req, res) => {
  try {
      const newUser = new User(req.body);

      await newUser.save();

      res.json({ message: 'Product added to User successfully', user: newUser });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
