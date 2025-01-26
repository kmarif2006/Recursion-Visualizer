import React from 'react';

const Controls = ({ 
  functionName, 
  setFunctionName, 
  inputValue, 
  setInputValue,
  onGenerateTree 
}) => {
  const getFunctionConfig = (name) => {
    const configs = {
      Fibonacci: { type: 'single', placeholder: 'Enter number (e.g., 5)', title: 'Enter a number for Fibonacci sequence' },
      Factorial: { type: 'single', placeholder: 'Enter number (e.g., 5)', title: 'Enter a number for Factorial calculation' },
      Power: { type: 'pair', placeholder: 'base,exponent (e.g., 2,3)', title: 'Enter base and exponent separated by comma' },
      GCD: { type: 'pair', placeholder: 'a,b (e.g., 12,8)', title: 'Enter two numbers separated by comma' },
      BinarySearch: { type: 'pair', placeholder: 'target,max (e.g., 5,10)', title: 'Enter target number and maximum value' },
      ArraySum: { type: 'array', placeholder: '1,2,3,4,5', title: 'Enter numbers separated by commas' },
      TowerOfHanoi: { type: 'single', placeholder: 'Enter number of disks (e.g., 3)', title: 'Enter number of disks' }
    };
    return configs[name] || configs.Fibonacci;
  };

  const config = getFunctionConfig(functionName);

  const renderInput = () => {
    const baseClasses = "px-4 py-2 rounded-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50";
    
    switch (config.type) {
      case 'single':
        return (
          <input 
            type="number" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={config.placeholder}
            title={config.title}
            className={`${baseClasses} w-28`}
          />
        );
      
      case 'pair':
      case 'array':
        return (
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={config.placeholder}
            title={config.title}
            className={`${baseClasses} w-40`}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <select 
          value={functionName} 
          onChange={(e) => {
            setFunctionName(e.target.value);
            setInputValue('');
          }}
          className="px-4 py-2 rounded-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
        >
          <option value="Fibonacci">Fibonacci</option>
          <option value="Factorial">Factorial</option>
          <option value="Power">Power</option>
          <option value="GCD">GCD</option>
          <option value="BinarySearch">Binary Search</option>
          <option value="ArraySum">Array Sum</option>
          <option value="TowerOfHanoi">Tower of Hanoi</option>
        </select>

        {renderInput()}

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