import { useState, useEffect, useCallback, useMemo } from 'react';
import { calculate, formatResult, getLivePreview } from '../utils/calculator';
import { playKeyClick } from '../utils/audio';

export function useCalculator(soundEnabled = true) {
  const [currentInput, setCurrentInput] = useState('0');
  const [previousInput, setPreviousInput] = useState('');
  const [activeOperator, setActiveOperator] = useState(null);
  const [isNewNumber, setIsNewNumber] = useState(true);
  const [hasEvaluated, setHasEvaluated] = useState(false);

  // Calculation History
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('calc_history') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('calc_history', JSON.stringify(history));
  }, [history]);

  // Live real-time preview computation
  const livePreview = useMemo(() => {
    return getLivePreview(previousInput, currentInput, activeOperator);
  }, [previousInput, currentInput, activeOperator]);

  // Handle digit input (0-9)
  const inputDigit = useCallback((digit) => {
    playKeyClick('default', soundEnabled);

    setCurrentInput((prev) => {
      if (prev === 'Cannot divide by 0' || prev === 'Error' || hasEvaluated) {
        setHasEvaluated(false);
        setIsNewNumber(false);
        if (hasEvaluated) {
          setPreviousInput('');
          setActiveOperator(null);
        }
        return digit;
      }

      if (isNewNumber) {
        setIsNewNumber(false);
        return digit;
      }

      if (prev.replace('-', '').length >= 16) return prev;
      return prev === '0' ? digit : prev + digit;
    });
  }, [hasEvaluated, isNewNumber, soundEnabled]);

  // Handle decimal point (.)
  const inputDecimal = useCallback(() => {
    playKeyClick('default', soundEnabled);

    setCurrentInput((prev) => {
      if (hasEvaluated || isNewNumber || prev === 'Cannot divide by 0' || prev === 'Error') {
        setHasEvaluated(false);
        setIsNewNumber(false);
        return '0.';
      }
      if (!prev.includes('.')) {
        return prev + '.';
      }
      return prev;
    });
  }, [hasEvaluated, isNewNumber, soundEnabled]);

  // Handle arithmetic operators (+, -, ×, ÷)
  const handleOperator = useCallback((nextOperator) => {
    playKeyClick('operator', soundEnabled);

    if (currentInput === 'Cannot divide by 0' || currentInput === 'Error') {
      clearAll();
      return;
    }

    if (activeOperator && !isNewNumber) {
      const res = calculate(previousInput, currentInput, activeOperator);
      if (res === 'Cannot divide by 0') {
        setCurrentInput(res);
        setPreviousInput('');
        setActiveOperator(null);
        setIsNewNumber(true);
        return;
      }
      const formatted = formatResult(res);
      setCurrentInput(formatted);
      setPreviousInput(formatted);
    } else {
      setPreviousInput(currentInput);
    }

    setActiveOperator(nextOperator);
    setIsNewNumber(true);
    setHasEvaluated(false);
  }, [activeOperator, currentInput, isNewNumber, previousInput, soundEnabled]);

  // Handle equals (=)
  const calculateResult = useCallback(() => {
    if (!activeOperator || previousInput === '' || currentInput === 'Cannot divide by 0') {
      return;
    }

    playKeyClick('equals', soundEnabled);

    const raw = calculate(previousInput, currentInput, activeOperator);
    const finalResult = formatResult(raw);

    // Save to calculation history
    setHistory((prevHistory) => [
      {
        expression: `${previousInput} ${activeOperator} ${currentInput}`,
        result: finalResult,
        timestamp: Date.now()
      },
      ...prevHistory.slice(0, 29)
    ]);

    setCurrentInput(finalResult);
    setPreviousInput('');
    setActiveOperator(null);
    setIsNewNumber(true);
    setHasEvaluated(true);
  }, [activeOperator, currentInput, previousInput, soundEnabled]);

  // Handle All Clear (AC)
  const clearAll = useCallback(() => {
    playKeyClick('action', soundEnabled);
    setCurrentInput('0');
    setPreviousInput('');
    setActiveOperator(null);
    setIsNewNumber(true);
    setHasEvaluated(false);
  }, [soundEnabled]);

  // Handle Backspace (⌫)
  const deleteLastChar = useCallback(() => {
    playKeyClick('action', soundEnabled);

    if (currentInput === 'Cannot divide by 0' || currentInput === 'Error' || hasEvaluated) {
      clearAll();
      return;
    }

    if (isNewNumber) return;

    setCurrentInput((prev) => {
      if (prev.length > 1) {
        const next = prev.slice(0, -1);
        return next === '-' || next === '-0' ? '0' : next;
      }
      setIsNewNumber(true);
      return '0';
    });
  }, [clearAll, currentInput, hasEvaluated, isNewNumber, soundEnabled]);

  // Handle Percentage (%)
  const applyPercent = useCallback(() => {
    if (currentInput === 'Cannot divide by 0' || currentInput === 'Error') return;

    playKeyClick('action', soundEnabled);
    const val = parseFloat(currentInput);
    if (isNaN(val)) return;

    if (previousInput && activeOperator) {
      const base = parseFloat(previousInput);
      if (activeOperator === '+' || activeOperator === '-') {
        setCurrentInput(formatResult((base * val) / 100));
      } else {
        setCurrentInput(formatResult(val / 100));
      }
    } else {
      setCurrentInput(formatResult(val / 100));
    }
  }, [activeOperator, currentInput, previousInput, soundEnabled]);

  // Handle ± (negate sign)
  const toggleSign = useCallback(() => {
    if (currentInput === '0' || currentInput === 'Cannot divide by 0' || currentInput === 'Error') {
      return;
    }
    playKeyClick('action', soundEnabled);
    setCurrentInput((prev) => (prev.startsWith('-') ? prev.substring(1) : '-' + prev));
  }, [currentInput, soundEnabled]);

  // Recall a previous calculation from history
  const recallHistoryItem = useCallback((val) => {
    if (val !== 'Cannot divide by 0' && val !== 'Error') {
      playKeyClick('action', soundEnabled);
      setCurrentInput(val);
      setIsNewNumber(true);
      setHasEvaluated(true);
    }
  }, [soundEnabled]);

  // Clear all saved history
  const clearHistory = useCallback(() => {
    playKeyClick('action', soundEnabled);
    setHistory([]);
  }, [soundEnabled]);

  return {
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
  };
}

