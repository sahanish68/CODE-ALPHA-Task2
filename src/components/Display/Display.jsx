import React from 'react';
import './Display.css';

export default function Display({ expression, operator, value, preview }) {
  const getFontSizeClass = (val) => {
    const len = (val || '').length;
    if (len <= 9) return 'font-lg';
    if (len <= 13) return 'font-md';
    if (len <= 17) return 'font-sm';
    return 'font-xs';
  };

  return (
    <div className="display-container" role="region" aria-label="Calculator Screen">
      {/* Top Expression line */}
      <div className="history-preview-line" aria-live="polite">
        {expression}
      </div>

      {/* Main active operand */}
      <div className="main-display-row">
        <span className="operator-indicator">{operator || ''}</span>
        <div
          className={`main-display-value ${getFontSizeClass(value)}`}
          tabIndex={0}
          role="textbox"
          aria-readonly="true"
        >
          {value}
        </div>
      </div>

      {/* Real-time live result preview */}
      <div className="realtime-preview-line" title="Real-time calculated result">
        {preview}
      </div>
    </div>
  );
}

