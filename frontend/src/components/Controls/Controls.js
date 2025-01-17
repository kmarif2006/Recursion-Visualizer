import React from 'react';

const Controls = ({ 
  functionName, 
  setFunctionName, 
  inputValue, 
  setInputValue,
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
        </select>

        <input 
          type="number" 
          value={inputValue}
          onChange={(e) => setInputValue(parseInt(e.target.value) || 0)}
          placeholder={`Enter ${functionName === 'Fibonacci' ? 'n' : 'number'}`}
          title={functionName === 'Fibonacci' ? 'Enter a number n to calculate the nth Fibonacci number' :
                 'Enter a number to calculate its factorial'}
          className="px-4 py-2 rounded-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 w-28"
        />

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