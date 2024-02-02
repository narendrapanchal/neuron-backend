const express = require("express");
const router = express.Router();
const {User} = require("../model/user.model.js");

router.get("/", async (req, res) => {
    try {
      const users = await User.find().lean().exec();
      return res.send(users);
    } catch (e) {
      return res.status(500).json({ message: e.message, status: "Failed" });
    }
  });
  
router.post('/add', async (req, res) => {
  try {
      const newUser = new User();

      await newUser.save();

      res.json({ message: 'Product added to User successfully', user: newUser });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
