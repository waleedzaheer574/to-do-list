import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';

const TodoForm = ({ onAdd, editingTodo, onUpdate }) => {
  const [inputValue, setInputValue] = useState('');
  const [priority, setPriority] = useState('medium');

  useEffect(() => {
    if (editingTodo) {
      setInputValue(editingTodo.text);
      setPriority(editingTodo.priority);
    }
  }, [editingTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      if (editingTodo) {
        onUpdate({
          ...editingTodo,
          text: inputValue.trim(),
          priority
        });
      } else {
        onAdd(inputValue.trim(), priority);
      }
      setInputValue('');
      setPriority('medium');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title mb-3">
            {editingTodo ? 'Edit Todo' : 'Add New Todo'}
          </h5>
          
          <div className="row g-3">
            <div className="col-md-6">
              <div className="input-group">
                <span className="input-group-text bg-primary text-white">
                  📝
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="What needs to be done?"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  autoFocus
                />
              </div>
            </div>
            
            <div className="col-md-4">
              <select
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
            
            <div className="col-md-2">
              <button 
                type="submit" 
                className="btn btn-primary w-100"
              >
                <FaPlus className="me-2" />
                {editingTodo ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default TodoForm;