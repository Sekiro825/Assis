import React, { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTask({ id: Date.now(), name: task });
      setTask("");
    }
  };
//heyy//
  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center space-x-3">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-600 transition duration-200"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
