import React, { useState, useEffect } from 'react';
import TodoForm from './components/todoform';
import TodoList from './components/todolist';
import TodoFilter from './components/todofilter';
import { FaCheckCircle, FaClipboardList } from 'react-icons/fa';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [editingTodo, setEditingTodo] = useState(null);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text, priority) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      priority,
      createdAt: new Date().toISOString()
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  const deleteTodo = (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    setEditingTodo(todoToEdit);
  };

  const updateTodo = (updatedTodo) => {
    setTodos(todos.map(todo =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    ));
    setEditingTodo(null);
  };

  const clearCompleted = () => {
    if (window.confirm('Delete all completed todos?')) {
      setTodos(todos.filter(todo => !todo.completed));
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            
            {/* Header */}
            <div className="text-center mb-4">
              <h1 className="display-4 fw-bold text-primary mb-3">
                <FaClipboardList className="me-3" />
                Todo List
              </h1>
              <p className="lead text-muted">
                Stay organized and productive with Bootstrap
              </p>
            </div>

            {/* Stats Cards */}
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <div className="card bg-primary text-white">
                  <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-white-50">Total</h6>
                    <h2 className="card-title mb-0">{todos.length}</h2>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-success text-white">
                  <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-white-50">Completed</h6>
                    <h2 className="card-title mb-0">{completedCount}</h2>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card bg-warning text-white">
                  <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-white-50">Active</h6>
                    <h2 className="card-title mb-0">{activeCount}</h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="card shadow-sm">
              <div className="card-body p-4">
                
                <TodoForm 
                  onAdd={addTodo} 
                  editingTodo={editingTodo}
                  onUpdate={updateTodo}
                />
                
                <TodoFilter 
                  filter={filter}
                  setFilter={setFilter}
                  sortOrder={sortOrder}
                  setSortOrder={setSortOrder}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
                
                <TodoList 
                  todos={todos}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                  filter={filter}
                  searchTerm={searchTerm}
                  sortOrder={sortOrder}
                />

                {todos.length > 0 && (
                  <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
                    <div className="text-muted">
                      <FaCheckCircle className="text-success me-1" />
                      {completedCount} completed
                    </div>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={clearCompleted}
                      disabled={completedCount === 0}
                    >
                      Clear completed
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-4 text-muted">
              <small>Double click todo to edit • Powered by Bootstrap 5</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;