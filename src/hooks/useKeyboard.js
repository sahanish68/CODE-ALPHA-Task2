import { useState, useEffect, useCallback } from 'react';

export function useKeyboard({
  onDigit,
  onDecimal,
  onOperator,
  onCalculate,
  onClear,
  onBackspace,
  onPercent,
  isHistoryOpen,
  closeHistory
}) {
  const [activeKeyId, setActiveKeyId] = useState(null);

  const triggerKeyHighlight = useCallback((keyId) => {
    setActiveKeyId(keyId);
    setTimeout(() => {
      setActiveKeyId((curr) => (curr === keyId ? null : curr));
    }, 160);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Close history if open on Escape
      if (e.key === 'Escape') {
        if (isHistoryOpen) {
          closeHistory();
        } else {
          triggerKeyHighlight('clear');
          onClear();
        }
        return;
      }

      // Digits 0-9
      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        triggerKeyHighlight(`num-${e.key}`);
        onDigit(e.key);
        return;
      }

      // Decimal point
      if (e.key === '.') {
        e.preventDefault();
        triggerKeyHighlight('decimal');
        onDecimal();
        return;
      }

      // Operators (+, -)
      if (e.key === '+' || e.key === '-') {
        e.preventDefault();
        triggerKeyHighlight(`op-${e.key}`);
        onOperator(e.key);
        return;
      }

      // Multiplication (* or x)
      if (e.key === '*' || e.key.toLowerCase() === 'x') {
        e.preventDefault();
        triggerKeyHighlight('op-×');
        onOperator('×');
        return;
      }

      // Division (/)
      if (e.key === '/') {
        e.preventDefault();
        triggerKeyHighlight('op-÷');
        onOperator('÷');
        return;
      }

      // Calculate (Enter or =)
      if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        triggerKeyHighlight('equals');
        onCalculate();
        return;
      }

      // Backspace
      if (e.key === 'Backspace') {
        e.preventDefault();
        triggerKeyHighlight('backspace');
        onBackspace();
        return;
      }

      // Clear (c or C)
      if (e.key.toLowerCase() === 'c') {
        e.preventDefault();
        triggerKeyHighlight('clear');
        onClear();
        return;
      }

      // Percentage (%)
      if (e.key === '%') {
        e.preventDefault();
        triggerKeyHighlight('percent');
        onPercent();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    closeHistory,
    isHistoryOpen,
    onBackspace,
    onCalculate,
    onClear,
    onDecimal,
    onDigit,
    onOperator,
    onPercent,
    triggerKeyHighlight
  ]);

  return { activeKeyId };
}

