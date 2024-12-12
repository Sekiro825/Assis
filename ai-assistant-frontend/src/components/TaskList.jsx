import React from "react";

const TaskList = ({ tasks, deleteTask }) => {
  return (
    <div>
      {tasks.length === 0 ? (
        <p className="text-gray-600 italic text-center">No tasks yet!</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-lg flex justify-between items-center hover:shadow-xl transition-shadow duration-300"
            >
              <span className="text-gray-700 font-medium">{task.name}</span>
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700 transition duration-200"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
