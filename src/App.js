import React, { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';
import confetti from 'canvas-confetti';
import './App.css';

function App() {
    const [currentInput, setCurrentInput] = useState('');
    const [memory, setMemory] = useState(0);
    const [isRadians, setIsRadians] = useState(true);
    const [lastResult, setLastResult] = useState(null);

    useEffect(() => {
        document.title = 'iOS Calculator';
    }, []);

    const updateDisplay = (value) => {
        setCurrentInput(value);
    };

    const calculateExpression = (expression) => {
        try {
            return evaluate(expression);
        } catch (error) {
            return 'Error';
        }
    };

    const triggerConfetti = () => {
        confetti();
    };

    const handleButtonClick = (buttonText) => {
        switch (buttonText) {
            case 'C':
                setCurrentInput('');
                setLastResult(null);
                updateDisplay('0');
                break;
            case 'MC':
                setMemory(0);
                break;
            case 'M+':
                setMemory(memory + parseFloat(currentInput || '0'));
                break;
            case 'M-':
                setMemory(memory - parseFloat(currentInput || '0'));
                break;
            case 'MR':
                setCurrentInput(memory.toString());
                updateDisplay(memory.toString());
                break;
            case '+/-':
                if (currentInput) {
                    const negated = (-parseFloat(currentInput)).toString();
                    setCurrentInput(negated);
                    updateDisplay(negated);
                }
                break;
            case '%':
                if (currentInput) {
                    const percentage = (parseFloat(currentInput) / 100).toString();
                    setCurrentInput(percentage);
                    updateDisplay(percentage);
                }
                break;
            case '÷':
            case 'x':
            case '+':
            case '-':
                if (lastResult !== null) {
                    setCurrentInput(lastResult + buttonText);
                } else {
                    setCurrentInput(currentInput + buttonText);
                }
                setLastResult(null);
                updateDisplay(currentInput + buttonText);
                break;
            case '=':
                if (currentInput) {
                    if (currentInput.includes('5') && currentInput.includes('6')) {
                        triggerConfetti();
                    }
                    const result = calculateExpression(currentInput.replace('÷', '/').replace('x', '*'));
                    setLastResult(result);
                    updateDisplay(result);
                    setCurrentInput('');
                }
                break;
            case 'π':
                setCurrentInput(Math.PI.toString());
                updateDisplay(Math.PI.toString());
                break;
            case 'e':
                setCurrentInput(Math.E.toString());
                updateDisplay(Math.E.toString());
                break;
            case 'Rand':
                const rand = Math.random().toString();
                setCurrentInput(rand);
                updateDisplay(rand);
                break;
            case 'Rad':
                setIsRadians(!isRadians);
                break;
            default:
                if (lastResult !== null && !isNaN(buttonText)) {
                    setCurrentInput(buttonText);
                } else {
                    setCurrentInput(currentInput + buttonText);
                }
                setLastResult(null);
                updateDisplay(currentInput + buttonText);
                break;
        }
    };

    return (
        <div className="calculator">
            <div className="display">
                <div id="result">{currentInput || '0'}</div>
            </div>
            <div className="buttons">
                {['(', ')', 'MC', 'M+', 'M-', 'MR', 'C', '+/-', '%', '÷', '2nd', 'x^2', 'x^3', 'x^y', 'e^x', '10^x', '7', '8', '9', 'x', '1/x', '2√x', '3√x', 'y√x', 'ln', 'log10', '4', '5', '6', '-', 'x!', 'sin', 'cos', 'tan', 'e', 'EE', '1', '2', '3', '+', 'Rad', 'sinh', 'cosh', 'tanh', 'π', 'Rand', '0', '.', '='].map((buttonText, index) => (
                    <button
                        key={index}
                        onClick={() => handleButtonClick(buttonText)}
                        className={buttonText === '0' ? 'double' : buttonText === '=' ? 'operation' : ''}
                        style={{ backgroundColor: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(buttonText) ? '#71716E' : '' }}
                    >
                        {buttonText}
                    </button>
                ))}
            </div>
            <div id="confetti-container"></div>
        </div>
    );
}

export default App;
