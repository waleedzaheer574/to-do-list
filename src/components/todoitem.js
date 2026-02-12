import React from 'react';
import { FaCheckCircle, FaCircle, FaTrash, FaEdit } from 'react-icons/fa';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const { id, text, completed, priority } = todo;

  const priorityColors = {
    high: 'danger',
    medium: 'warning',
    low: 'success'
  };

  return (
    <div className={`card mb-2 ${completed ? 'bg-light' : 'bg-white'}`}>
      <div className="card-body py-2">
        <div className="d-flex align-items-center gap-3">
          <button
            className={`btn btn-link p-0 ${completed ? 'text-success' : 'text-secondary'}`}
            onClick={() => onToggle(id)}
            aria-label={completed ? "Mark incomplete" : "Mark complete"}
          >
            {completed ? <FaCheckCircle size={24} /> : <FaCircle size={24} />}
          </button>
          
          <div className="flex-grow-1">
            <span className={`${completed ? 'text-decoration-line-through text-muted' : ''}`}>
              {text}
            </span>
            <span className={`badge bg-${priorityColors[priority]} ms-2`}>
              {priority}
            </span>
          </div>

          <div className="btn-group">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => onEdit(id)}
              aria-label="Edit todo"
            >
              <FaEdit />
            </button>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => onDelete(id)}
              aria-label="Delete todo"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;