import React from "react";

function TaskItem({ task, onUpdateStatus, onUpdatePriority, onDelete }) {
  const handleStatusChange = () => {
    const newStatus = task.status === "pending" ? "completed" : "pending";
    onUpdateStatus(task._id, newStatus);
  };

  const handlePriorityChange = (e) => {
    const newPriority = e.target.value;
    onUpdatePriority(task._id, newPriority);
  };

  return (
    <div className="task-item">
      <span className={task.status === "completed" ? "completed" : ""}>
        {task.name}
      </span>

      <div>
        <button onClick={handleStatusChange}>
          {task.status === "pending" ? "Mark as Done" : "Mark as Pending"}
        </button>

        <select onChange={handlePriorityChange} value={task.priority}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </div>
  );
}

export default TaskItem;
