const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed"], // States of the task
    default: "pending", // Default value
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"], // Priority of the task
    default: "medium", // Default value
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
