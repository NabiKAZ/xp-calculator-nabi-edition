import React, { useState } from 'react';
import XpButton from './XpButton';
import XpDisplay from './XpDisplay';
import { Plus, Minus, Divide, X, Equal, CircleX } from 'lucide-react';

const XpCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation(operator, firstOperand, inputValue);
      
      // Check if the result is a number or string
      if (typeof result === 'number') {
        setDisplay(String(result));
        setFirstOperand(result);
      } else {
        setDisplay(result); // Display error string
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(true);
        return;
      }
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const performCalculation = (op: string, firstOperand: number, secondOperand: number): number | string => {
    switch (op) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return secondOperand !== 0 ? firstOperand / secondOperand : 'Error';
      default:
        return secondOperand;
    }
  };

  const calculate = () => {
    if (firstOperand === null || operator === null) {
      return;
    }

    const inputValue = parseFloat(display);
    const result = performCalculation(operator, firstOperand, inputValue);
    
    // Check if result is a number or error string
    setDisplay(String(result));
    
    if (typeof result === 'number') {
      setFirstOperand(null);
    } else {
      setFirstOperand(null);
    }
    
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  return (
    <div className="xp-window w-64 select-none">
      <div className="xp-titlebar">
        <span className="xp-titlebar-text text-sm">نبی</span>
        <button className="text-white hover:text-gray-200">
          <CircleX size={18} />
        </button>
      </div>
      <div className="xp-window-body">
        <XpDisplay value={display} />
        
        <div className="grid grid-cols-4 gap-2">
          <XpButton value="CE" onClick={clear} className="bg-red-100 hover:bg-red-200">
            CE
          </XpButton>
          <XpButton value="C" onClick={clear} className="bg-red-100 hover:bg-red-200">
            C
          </XpButton>
          <XpButton value="←" onClick={() => setDisplay(display.length > 1 ? display.slice(0, -1) : '0')}>
            ←
          </XpButton>
          <XpButton value="/" onClick={() => handleOperator('/')}>
            <Divide size={16} />
          </XpButton>
          
          <XpButton value="7" onClick={() => inputDigit('7')}>
            7
          </XpButton>
          <XpButton value="8" onClick={() => inputDigit('8')}>
            8
          </XpButton>
          <XpButton value="9" onClick={() => inputDigit('9')}>
            9
          </XpButton>
          <XpButton value="*" onClick={() => handleOperator('*')}>
            <X size={16} />
          </XpButton>
          
          <XpButton value="4" onClick={() => inputDigit('4')}>
            4
          </XpButton>
          <XpButton value="5" onClick={() => inputDigit('5')}>
            5
          </XpButton>
          <XpButton value="6" onClick={() => inputDigit('6')}>
            6
          </XpButton>
          <XpButton value="-" onClick={() => handleOperator('-')}>
            <Minus size={16} />
          </XpButton>
          
          <XpButton value="1" onClick={() => inputDigit('1')}>
            1
          </XpButton>
          <XpButton value="2" onClick={() => inputDigit('2')}>
            2
          </XpButton>
          <XpButton value="3" onClick={() => inputDigit('3')}>
            3
          </XpButton>
          <XpButton value="+" onClick={() => handleOperator('+')}>
            <Plus size={16} />
          </XpButton>
          
          <XpButton value="0" onClick={() => inputDigit('0')} className="col-span-2">
            0
          </XpButton>
          <XpButton value="." onClick={inputDecimal}>
            .
          </XpButton>
          <XpButton value="=" onClick={calculate} className="bg-blue-100 hover:bg-blue-200">
            <Equal size={16} />
          </XpButton>
        </div>
      </div>
    </div>
  );
};

export default XpCalculator;
