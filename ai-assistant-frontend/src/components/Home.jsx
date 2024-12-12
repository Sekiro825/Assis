import React, { useState, useEffect } from "react";
import { fetchTasks, addTask, deleteTask } from "./api";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks on component mount
  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasksFromServer = await fetchTasks();
        setTasks(tasksFromServer);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };
    getTasks();
  }, []);

  // Add a new task
  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    try {
      const task = { title: newTask, description: "Default description" };
      const addedTask = await addTask(task);
      setTasks([...tasks, addedTask]); // Update state with the new task
      setNewTask("");
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  // Delete a task
  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id)); // Remove from state
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      
      {/* Add Task */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border rounded p-2 mr-2"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white rounded px-4 py-2"
        >
          Add Task
        </button>
      </div>

      {/* List Tasks */}
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="mb-2 flex justify-between items-center">
            <span>{task.title}</span>
            <button
              onClick={() => handleDeleteTask(task._id)}
              className="bg-red-500 text-white rounded px-4 py-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
