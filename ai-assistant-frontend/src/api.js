import axios from 'axios';

// Base URL of the backend
const API_URL = "http://localhost:5000/api/tasks";

// Fetch all tasks
export const fetchTasks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Returns the tasks array
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

// Add a new task
export const addTask = async (task) => {
  try {
    const response = await axios.post(API_URL, task);
    return response.data; // Returns the created task
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

// Update a task
export const updateTask = async (id, updatedTask) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedTask);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
