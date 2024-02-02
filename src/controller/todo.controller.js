const express = require("express");
const router = express.Router();
const {Todo} = require("../model/todo.model.js");
const authenticate=require("../authenticate")
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().lean().exec();
    return res.send(todos);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});


router.post('/add',authenticate, async (req, res) => {
  try {
      const { text,userId } = req.body;

      const newTodo = new Todo({
          text,userId
      });

      await newTodo.save();

      res.json({ message: 'Product added to Todo successfully', todo: newTodo });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.patch('/:todoId',authenticate,async (req, res) => {
  try {
      const todoId = req.params.todoId;
      console.log(todoId)
      const todo = await Todo.findByIdAndUpdate(
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
