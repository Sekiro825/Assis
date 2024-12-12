const express = require("express");
const Task = require("../models/taskModel");
const router = express.Router();

// Route to get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).send({ message: "Error fetching tasks" });
  }
});

// Route to create a new task
router.post("/", async (req, res) => {
  const { name, priority } = req.body;
  const task = new Task({
    name,
    priority,
  });
  try {
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).send({ message: "Error creating task" });
  }
});

// Route to update task (status or priority)
router.put("/:id", async (req, res) => {
  const { status, priority } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status, priority },
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(400).send({ message: "Error updating task" });
  }
});

// Route to delete a task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: "Error deleting task" });
  }
});

module.exports = router;
