import React from 'react';


const Controls = ({ 
  functionName, 
  setFunctionName, 
  inputValue, 
  setInputValue,
  onGenerateTree,
  isDarkMode 
}) => {
  const getFunctionConfig = (name) => {
    const configs = {
      Fibonacci: { 
        type: 'single', 
        placeholder: 'Enter number (e.g., 5)', 
        title: 'Enter a number for Fibonacci sequence',
        defaultValue: '5',
        min: 0,
        max: 10
      },
      Factorial: { 
        type: 'single', 
        placeholder: 'Enter number (e.g., 5)', 
        title: 'Enter a number for Factorial calculation',
        defaultValue: '5',
        min: 0,
        max: 10
      },
      Power: { 
        type: 'pair', 
        placeholder: 'base,exponent (e.g., 2,3)', 
        title: 'Enter base and exponent separated by comma',
        defaultValue: '2,3'
      },
      GCD: { 
        type: 'pair', 
        placeholder: 'num1,num2 (e.g., 12,8)', 
        title: 'Enter two numbers separated by comma',
        defaultValue: '12,8'
      },
      BinarySearch: { 
        type: 'pair', 
        placeholder: 'target,max (e.g., 5,10)', 
        title: 'Enter target and maximum value',
        defaultValue: '5,10'
      },
      ArraySum: { 
        type: 'array', 
        placeholder: 'Enter numbers (e.g., 1,2,3,4)', 
        title: 'Enter array elements separated by comma',
        defaultValue: '1,2,3,4'
      },
      TowerOfHanoi: { 
        type: 'single', 
        placeholder: 'Enter number of disks (1-5)', 
        title: 'Enter number of disks (max 5)',
        defaultValue: '3',
        min: 1,
        max: 5
      }
    };
    return configs[name] || configs.Fibonacci;
  };

  const config = getFunctionConfig(functionName);

  const handleFunctionChange = (e) => {
    const newFunction = e.target.value;
    setFunctionName(newFunction);
    setInputValue(getFunctionConfig(newFunction).defaultValue);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (config.type === 'single') {
      const num = parseInt(value);
      if (!isNaN(num) && num >= config.min && num <= config.max) {
        setInputValue(value);
      } else if (value === '' || value === '-') {
        setInputValue(value);
      }
    } else {
      setInputValue(value);
    }
  };

  const renderInput = () => {
    const inputClasses = `px-4 py-2 rounded-md border focus:outline-none focus:ring-2 
      focus:ring-blue-500 transition-colors duration-200
      ${isDarkMode 
        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`;

    return (
      <input
        type={config.type === 'single' ? 'number' : 'text'}
        value={inputValue}
        onChange={handleInputChange}
        placeholder={config.placeholder}
        title={config.title}
        min={config.min}
        max={config.max}
        className={`${inputClasses} w-64`}
      />
    );
  };

  return (
    <div className={`p-6 rounded-lg shadow-lg transition-colors duration-200
      ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        <select 
          value={functionName} 
          onChange={handleFunctionChange}
          className={`px-4 py-2 rounded-md border focus:outline-none focus:ring-2 
            focus:ring-blue-500 transition-colors duration-200
            ${isDarkMode 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'bg-white border-gray-300 text-gray-900'}`}
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
          className={`px-6 py-2 text-white rounded-md transition-colors duration-200 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            ${isDarkMode 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-blue-500 hover:bg-blue-600'}`}
        >
          Visualize
        </button>
      </div>
    </div>
  );
};

export default Controls; 