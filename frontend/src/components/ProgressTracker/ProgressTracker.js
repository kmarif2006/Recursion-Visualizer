import React from 'react';

const ProgressTracker = ({ 
  currentStep, 
  totalSteps, 
  currentNode, 
  isDarkMode 
}) => {
  const calculateProgress = () => {
    return (currentStep / (totalSteps - 1)) * 100;
  };

  return (
    <div className={`p-4 rounded-lg shadow-md ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      {/* Progress Bar */}
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${
              isDarkMode ? 'text-blue-300 bg-blue-900' : 'text-blue-600 bg-blue-200'
            }`}>
              Progress
            </span>
          </div>
          <div className={`text-right ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            <span className="text-xs font-semibold inline-block">
              {Math.round(calculateProgress())}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 dark:bg-gray-700">
          <div
            style={{ width: `${calculateProgress()}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-300"
          />
        </div>
      </div>

      {/* Current Operation Details */}
      <div className={`mt-4 p-3 rounded-lg ${
        isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
      }`}>
        <h3 className={`text-sm font-medium mb-2 ${
          isDarkMode ? 'text-gray-200' : 'text-gray-700'
        }`}>
          Current Operation
        </h3>
        <div className={`text-sm ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          <p className="mb-1">Step: {currentStep + 1} of {totalSteps}</p>
          {currentNode && (
            <>
              <p className="mb-1">Operation: {currentNode.name}</p>
              <p className="mb-1">Value: {currentNode.value}</p>
              <p>{currentNode.explanation}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker; 