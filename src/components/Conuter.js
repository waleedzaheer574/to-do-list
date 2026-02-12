import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [history, setHistory] = useState([]);

  const increment = () => {
    const newCount = count + step;
    setCount(newCount);
    setHistory([...history, { type: 'increment', from: count, to: newCount, step }]);
  };

  const decrement = () => {
    const newCount = count - step;
    setCount(newCount);
    setHistory([...history, { type: 'decrement', from: count, to: newCount, step }]);
  };

  const reset = () => {
    setHistory([...history, { type: 'reset', from: count, to: 0 }]);
    setCount(0);
  };

  const handleStepChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setStep(Math.max(1, Math.min(10, value))); // Limit step between 1 and 10
  };

  return (
    <div className="counter-container">
      <h2>Counter Application</h2>
      
      <div className="counter-display">
        <div className="count-value">Count: {count}</div>
        
        <div className="step-control">
          <label htmlFor="step">Step Size: </label>
          <input
            id="step"
            type="number"
            value={step}
            onChange={handleStepChange}
            min="1"
            max="10"
            className="step-input"
          />
        </div>

        <div className="counter-buttons">
          <button onClick={decrement} className="btn btn-decrement">
            Decrease (-{step})
          </button>
          <button onClick={reset} className="btn btn-reset">
            Reset
          </button>
          <button onClick={increment} className="btn btn-increment">
            Increase (+{step})
          </button>
        </div>

        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="quick-buttons">
            {[2, 5, 10].map((quickStep) => (
              <button
                key={quickStep}
                onClick={() => setCount(count + quickStep)}
                className="btn btn-quick"
              >
                +{quickStep}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="history-section">
        <h3>History</h3>
        {history.length === 0 ? (
          <p className="no-history">No actions performed yet.</p>
        ) : (
          <ul className="history-list">
            {history.slice(-5).reverse().map((item, index) => (
              <li key={index} className={`history-item history-${item.type}`}>
                {item.type === 'reset' 
                  ? `Reset count from ${item.from} to 0`
                  : `${item.type === 'increment' ? 'Increased' : 'Decreased'} from ${item.from} to ${item.to} (step: ${item.step})`}
              </li>
            ))}
          </ul>
        )}
        {history.length > 0 && (
          <button 
            onClick={() => setHistory([])} 
            className="btn btn-clear-history"
          >
            Clear History
          </button>
        )}
      </div>
    </div>
  );
};

export default Counter;