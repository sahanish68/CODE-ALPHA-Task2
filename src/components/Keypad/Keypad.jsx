import React from 'react';
import './Keypad.css';

export default function Keypad({
  onDigit,
  onDecimal,
  onOperator,
  onCalculate,
  onClear,
  onBackspace,
  onPercent,
  onToggleSign,
  activeOperator,
  activeKeyId
}) {
  const isKeyActive = (id) => (activeKeyId === id ? 'active-key' : '');

  return (
    <>
      <div className="keypad-grid" role="grid" aria-label="Keypad">
        {/* Row 1 */}
        <button
          type="button"
          className={`btn btn-function ${isKeyActive('clear')}`}
          onClick={onClear}
          aria-label="All Clear"
        >
          AC
        </button>
        <button
          type="button"
          className={`btn btn-function ${isKeyActive('backspace')}`}
          onClick={onBackspace}
          aria-label="Backspace"
        >
          ⌫
        </button>
        <button
          type="button"
          className={`btn btn-function ${isKeyActive('percent')}`}
          onClick={onPercent}
          aria-label="Percentage"
        >
          %
        </button>
        <button
          type="button"
          className={`btn btn-operator ${activeOperator === '÷' ? 'selected-op' : ''} ${isKeyActive('op-÷')}`}
          onClick={() => onOperator('÷')}
          aria-label="Divide"
        >
          ÷
        </button>

        {/* Row 2 */}
        <button
          type="button"
          className={`btn btn-number ${isKeyActive('num-7')}`}
          onClick={() => onDigit('7')}
        >
          7
        </button>
        <button
          type="button"
          className={`btn btn-number ${isKeyActive('num-8')}`}
          onClick={() => onDigit('8')}
        >
          8
        </button>
        <button
          type="button"
          className={`btn btn-number ${isKeyActive('num-9')}`}
          onClick={() => onDigit('9')}
        >
          9
        </button>
        <button
          type="button"
          className={`btn btn-operator ${activeOperator === '×' ? 'selected-op' : ''} ${isKeyActive('op-×')}`}
          onClick={() => onOperator('×')}
          aria-label="Multiply"
        >
          ×
        </button>

        {/* Row 3 */}
        <button
          type="button"
          className={`btn btn-number ${isKeyActive('num-4')}`}
          onClick={() => onDigit('4')}
        >
          4
        </button>
        <button
          type="button"
          className={`btn btn-number ${isKeyActive('num-5')}`}
          onClick={() => onDigit('5')}
        >
          5
        </button>
        <button
          type="button"
          className={`btn btn-number ${isKeyActive('num-6')}`}
          onClick={() => onDigit('6')}
        >
          6
        </button>
        <button
          type="button"
          className={`btn btn-operator ${activeOperator === '-' ? 'selected-op' : ''} ${isKeyActive('op--')}`}
          onClick={() => onOperator('-')}
          aria-label="Subtract"
        >
          −
        </button>

        {/* Row 4 */}
        <button
          type="button"
          className={`btn btn-number ${isKeyActive('num-1')}`}
          onClick={() => onDigit('1')}
        >
          1
        </button>
        <button
          type="button"
          className={`btn btn-number ${isKeyActive('num-2')}`}
          onClick={() => onDigit('2')}
        >
          2
        </button>
        <button
          type="button"
          className={`btn btn-number ${isKeyActive('num-3')}`}
          onClick={() => onDigit('3')}
        >
          3
        </button>
        <button
          type="button"
          className={`btn btn-operator ${activeOperator === '+' ? 'selected-op' : ''} ${isKeyActive('op-+')}`}
          onClick={() => onOperator('+')}
          aria-label="Add"
        >
          +
        </button>

        {/* Row 5 */}
        <button
          type="button"
          className={`btn btn-function ${isKeyActive('toggle-sign')}`}
          onClick={onToggleSign}
          aria-label="Negate Number"
        >
          ±
        </button>
        <button
          type="button"
          className={`btn btn-number ${isKeyActive('num-0')}`}
          onClick={() => onDigit('0')}
        >
          0
        </button>
        <button
          type="button"
          className={`btn btn-number ${isKeyActive('decimal')}`}
          onClick={onDecimal}
          aria-label="Decimal point"
        >
          .
        </button>
        <button
          type="button"
          className={`btn btn-equals ${isKeyActive('equals')}`}
          onClick={onCalculate}
          aria-label="Calculate"
        >
          =
        </button>
      </div>

      <footer className="keyboard-hint-bar">
        <span>⌨️ Full Keyboard Supported</span>
        <span className="hint-separator">•</span>
        <span>Enter: <strong>=</strong></span>
        <span className="hint-separator">•</span>
        <span>Esc: <strong>AC</strong></span>
        <span className="hint-separator">•</span>
        <span>Backspace: <strong>DEL</strong></span>
      </footer>
    </>
  );
}

