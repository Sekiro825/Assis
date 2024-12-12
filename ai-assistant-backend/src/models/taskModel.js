const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: "pending" }, // task status (e.g., pending, in-progress, completed)
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
    