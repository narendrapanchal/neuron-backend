const express = require("express");
const router = express.Router();
const {Client} = require("../model/todo.model.js");
const authenticate=require("../authenticate")
router.get("/validclients", async (req, res) => {
  try {
    // Get the current date
    const today = new Date();

    // Fetch clients whose 'validTillDate' is greater than today's date
    const clients = await Client.find({ validTillDate: { $gt: today } })
      .lean()
      .exec();

    return res.send(clients);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});
router.get("/dueclients", async (req, res) => {
  try {
    // Get the current date
    const today = new Date();

    // Fetch clients whose 'validTillDate' is greater than today's date
    const clients = await Client.find({ validTillDate: { $lte: today } })
      .lean()
      .exec();

    return res.send(clients);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});


router.post('/add',authenticate, async (req, res) => {
  try {
      const newClient = new Client(req.body);
      await newClient.save();
      res.json({ message: 'Product added to Todo successfully', todo: newTodo });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.patch('/:todoId',authenticate,async (req, res) => {
  try {
      const todoId = req.params.todoId;
      const todo = await Client.findByIdAndUpdate(
          todoId,
          req.body,
          { new: true }
      );
      if (!todo) {
          return res.status(404).json({ message: 'Todo not found in the Todo' });
      }
      res.json({ message: 'Todo quantity updated successfully', todo });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
