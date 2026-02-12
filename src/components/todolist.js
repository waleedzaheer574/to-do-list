import React from 'react';
import TodoItem from './todoitem';
import { FaTasks } from 'react-icons/fa';

const TodoList = ({ 
  todos, 
  onToggle, 
  onDelete, 
  onEdit,
  filter,
  searchTerm,
  sortOrder 
}) => {
  // Filter todos
  const filteredTodos = todos.filter(todo => {
    // Search filter
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'active' && !todo.completed) ||
      (filter === 'completed' && todo.completed);
    
    return matchesSearch && matchesFilter;
  });

  // Sort todos
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  });

  if (sortedTodos.length === 0) {
    return (
      <div className="text-center py-5">
        <FaTasks size={48} className="text-muted mb-3" />
        <h5 className="text-muted">No todos found</h5>
        <p className="text-muted">
          {searchTerm ? 'Try adjusting your search' : 'Add a new todo to get started!'}
        </p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {sortedTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
      
      <div className="text-muted text-end mt-3">
        <small>Showing {sortedTodos.length} of {todos.length} todos</small>
      </div>
    </div>
  );
};

export default TodoList;