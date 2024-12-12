import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskItem from "./TaskItem";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data);
    };

    fetchTasks();
  }, []);

  // Add a new task
  const handleAddTask = async () => {
    if (newTask.trim() === "") return;

    const response = await axios.post("http://localhost:5000/api/tasks", {
      name: newTask,
      priority: "medium", // default priority
    });
    setTasks([...tasks, response.data]);
    setNewTask("");
  };

  // Update task status
  const handleUpdateStatus = async (taskId, status) => {
    const response = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, {
      status,
    });
    setTasks(
      tasks.map((task) =>
        task._id === taskId ? { ...task, status: response.data.status } : task
      )
    );
  };

  // Update task priority
  const handleUpdatePriority = async (taskId, priority) => {
    const response = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, {
      priority,
    });
    setTasks(
      tasks.map((task) =>
        task._id === taskId ? { ...task, priority: response.data.priority } : task
      )
    );
  };

  // Delete a task
  const handleDeleteTask = async (taskId) => {
    await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  return (
    <div>
      <h2>Task Manager</h2>
      <input
        type="text"
        placeholder="Add a task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Add</button>

      <div>
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onUpdateStatus={handleUpdateStatus}
            onUpdatePriority={handleUpdatePriority}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
