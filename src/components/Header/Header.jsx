import React from 'react';
import './Header.css';

export default function Header({
  theme,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
  isHistoryOpen,
  onToggleHistory,
  bgStyle,
  onToggleBgStyle
}) {
  return (
    <header className="calc-toolbar">
      <div className="app-branding">
        <span className="brand-badge">REACT</span>
        <span className="brand-title">CodeAlpha Calc</span>
      </div>

      <div className="toolbar-actions">
        {/* Toggle Pinterest background mode: cover vs pattern */}
        <button
          type="button"
          className={`icon-btn ${bgStyle === 'pattern' ? 'active' : ''}`}
          onClick={onToggleBgStyle}
          title={`Background Mode: ${bgStyle === 'cover' ? 'Tiled Pattern' : 'Full Cover'}`}
          aria-label="Toggle Background Mode"
        >
          🖼️
        </button>

        {/* Toggle audio click feedback */}
        <button
          type="button"
          className={`icon-btn ${soundEnabled ? '' : 'muted'}`}
          onClick={onToggleSound}
          title={soundEnabled ? 'Sound: On' : 'Sound: Off'}
          aria-label="Toggle Sound"
        >
          <span className="sound-icon">{soundEnabled ? '🔊' : '🔇'}</span>
        </button>

        {/* Toggle calculation history */}
        <button
          type="button"
          className={`icon-btn ${isHistoryOpen ? 'active' : ''}`}
          onClick={onToggleHistory}
          title="View Calculation History"
          aria-label="View History"
        >
          📜
        </button>

        {/* Toggle Dark/Light Theme */}
        <button
          type="button"
          className="icon-btn"
          onClick={onToggleTheme}
          title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
}

