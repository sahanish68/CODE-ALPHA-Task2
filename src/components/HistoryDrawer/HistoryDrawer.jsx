import React from 'react';
import './HistoryDrawer.css';

export default function HistoryDrawer({
  isOpen,
  history,
  onClose,
  onClear,
  onSelectResult
}) {
  return (
    <aside
      className={`history-drawer ${isOpen ? 'open' : ''}`}
      aria-label="Calculation History"
      aria-hidden={!isOpen}
    >
      <div className="history-header">
        <h2 className="history-title">History</h2>
        <div className="history-header-actions">
          {history.length > 0 && (
            <button
              type="button"
              className="text-btn danger-text"
              onClick={onClear}
              title="Clear all history"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            className="icon-btn small-btn"
            onClick={onClose}
            aria-label="Close History"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="history-list">
        {history.length === 0 ? (
          <p className="history-empty">No calculations yet</p>
        ) : (
          history.map((item, index) => (
            <div
              key={index}
              className="history-item"
              role="button"
              tabIndex={0}
              title="Click to use this result"
              onClick={() => onSelectResult(item.result)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectResult(item.result);
                }
              }}
            >
              <div className="history-item-exp">{item.expression} =</div>
              <div className="history-item-res">{item.result}</div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}

