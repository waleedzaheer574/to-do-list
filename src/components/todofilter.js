import React from 'react';
import { FaFilter, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

const TodoFilter = ({ 
  filter, 
  setFilter, 
  sortOrder, 
  setSortOrder,
  searchTerm,
  setSearchTerm 
}) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="row g-3">
          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-text">
                🔍
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search todos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="btn-group w-100">
              <button
                className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button
                className={`btn ${filter === 'active' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('active')}
              >
                Active
              </button>
              <button
                className={`btn ${filter === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setFilter('completed')}
              >
                Completed
              </button>
            </div>
          </div>
          
          <div className="col-md-4">
            <button
              className="btn btn-outline-secondary w-100"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? (
                <><FaSortAmountUp className="me-2" /> Oldest First</>
              ) : (
                <><FaSortAmountDown className="me-2" /> Newest First</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoFilter;