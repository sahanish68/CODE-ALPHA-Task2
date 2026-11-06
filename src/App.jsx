import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Display from './components/Display/Display';
import Keypad from './components/Keypad/Keypad';
import HistoryDrawer from './components/HistoryDrawer/HistoryDrawer';
import { useCalculator } from './hooks/useCalculator';
import { useKeyboard } from './hooks/useKeyboard';
import './App.css';

export default function App() {
  // Theme & Preferences State
  const [theme, setTheme] = useState(() => localStorage.getItem('calc_theme') || 'dark');
  const [soundEnabled, setSoundEnabled] = useState(() => localStorage.getItem('calc_sound') !== 'false');
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [bgStyle, setBgStyle] = useState('cover'); // 'cover' or 'pattern'

  // Calculator Logic via Custom Hook
  const {
    currentInput,
    previousInput,
    activeOperator,
    hasEvaluated,
    livePreview,
    history,
    inputDigit,
    inputDecimal,
    handleOperator,
    calculateResult,
    clearAll,
    deleteLastChar,
    applyPercent,
    toggleSign,
    recallHistoryItem,
    clearHistory
  } = useCalculator(soundEnabled);

  // Keyboard Shortcuts via Custom Hook
  const { activeKeyId } = useKeyboard({
    onDigit: inputDigit,
    onDecimal: inputDecimal,
    onOperator: handleOperator,
    onCalculate: calculateResult,
    onClear: clearAll,
    onBackspace: deleteLastChar,
    onPercent: applyPercent,
    isHistoryOpen,
    closeHistory: () => setIsHistoryOpen(false)
  });

  // Sync theme with document element & storage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('calc_theme', theme);
  }, [theme]);

  // Persist sound preference
  useEffect(() => {
    localStorage.setItem('calc_sound', soundEnabled);
  }, [soundEnabled]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  const toggleSound = () => setSoundEnabled((prev) => !prev);
  const toggleHistory = () => setIsHistoryOpen((prev) => !prev);
  const toggleBgStyle = () => setBgStyle((s) => (s === 'cover' ? 'pattern' : 'cover'));

  return (
    <div className={`app-container bg-${bgStyle}`}>
      {/* Pinterest Aesthetic Background Layer */}
      <div className="pinterest-bg-layer" aria-hidden="true" />
      <div className="pinterest-tint-overlay" aria-hidden="true" />

      {/* Floating Ambient Glowing Orbs */}
      <div className="background-decorations" aria-hidden="true">
        <div className="glow-orb orb-1" />
        <div className="glow-orb orb-2" />
      </div>

      <main className="calculator-wrapper">
        {/* Header Toolbar */}
        <Header
          theme={theme}
          onToggleTheme={toggleTheme}
          soundEnabled={soundEnabled}
          onToggleSound={toggleSound}
          isHistoryOpen={isHistoryOpen}
          onToggleHistory={toggleHistory}
          bgStyle={bgStyle}
          onToggleBgStyle={toggleBgStyle}
        />

        {/* Calculator Main Section */}
        <section className="calculator-card" aria-label="Calculator">
          <Display
            expression={
              previousInput && activeOperator
                ? `${previousInput} ${activeOperator}`
                : hasEvaluated
                ? `${currentInput} =`
                : ''
            }
            operator={activeOperator}
            value={currentInput}
            preview={livePreview}
          />

          <Keypad
            onDigit={inputDigit}
            onDecimal={inputDecimal}
            onOperator={handleOperator}
            onCalculate={calculateResult}
            onClear={clearAll}
            onBackspace={deleteLastChar}
            onPercent={applyPercent}
            onToggleSign={toggleSign}
            activeOperator={activeOperator}
            activeKeyId={activeKeyId}
          />
        </section>

        {/* Slide-over History Drawer */}
        <HistoryDrawer
          isOpen={isHistoryOpen}
          history={history}
          onClose={() => setIsHistoryOpen(false)}
          onClear={clearHistory}
          onSelectResult={(val) => {
            recallHistoryItem(val);
            setIsHistoryOpen(false);
          }}
        />
      </main>
    </div>
  );
}
