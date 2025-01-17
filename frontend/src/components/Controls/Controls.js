import React from 'react';

const Controls = ({ 
  functionName, 
  setFunctionName, 
  inputValue, 
  setInputValue,
  powerBase,
  setPowerBase,
  powerExp,
  setPowerExp,
  onGenerateTree 
}) => {
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <select 
          value={functionName} 
          onChange={(e) => setFunctionName(e.target.value)}
          className="px-4 py-2 rounded-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
        >
          <option value="Fibonacci">Fibonacci</option>
          <option value="Factorial">Factorial</option>
          <option value="SumOfN">Sum of N</option>
          <option value="Power">Power</option>
        </select>

        {functionName === 'Power' ? (
          <>
            <input 
              type="number" 
              value={powerBase}
              onChange={(e) => setPowerBase(parseInt(e.target.value) || 0)}
              placeholder="Enter base"
              title="Enter the base number (e.g., 2 for 2^n)"
              className="px-4 py-2 rounded-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 w-24"
            />
            <input 
              type="number" 
              value={powerExp}
              onChange={(e) => setPowerExp(parseInt(e.target.value) || 0)}
              placeholder="Enter exponent"
              title="Enter the exponent (e.g., 3 for x³)"
              className="px-4 py-2 rounded-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 w-24"
            />
          </>
        ) : (
          <input 
            type="number" 
            value={inputValue}
            onChange={(e) => setInputValue(parseInt(e.target.value) || 0)}
            placeholder={`Enter ${functionName === 'Fibonacci' ? 'n' : 
                         functionName === 'Factorial' ? 'number' : 
                         functionName === 'SumOfN' ? 'n' : 'value'}`}
            title={functionName === 'Fibonacci' ? 'Enter a number n to calculate the nth Fibonacci number' :
                   functionName === 'Factorial' ? 'Enter a number to calculate its factorial' :
                   functionName === 'SumOfN' ? 'Enter a number n to calculate sum from 1 to n' :
                   'Enter a value'}
            className="px-4 py-2 rounded-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 w-28"
          />
        )}

        <button 
          onClick={onGenerateTree}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                   transition-colors duration-200 focus:outline-none focus:ring-2 
                   focus:ring-blue-400 focus:ring-offset-2"
        >
          Visualize
        </button>
      </div>
    </div>
  );
};

export default Controls; 