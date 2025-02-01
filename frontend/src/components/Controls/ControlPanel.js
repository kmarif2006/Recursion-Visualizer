import React from 'react';

const ControlPanel = ({progress, currentMessage }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center w-full mb-2">
        
        <div className="relative w-full h-2 bg-gray-300 rounded mx-2">
          <div className="absolute h-full bg-blue-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
        
      </div>
      <div className="w-full text-center">
        <p className="text-blue-700 font-semibold">{currentMessage}</p>
      </div>
    </div>
  );
};

export default ControlPanel;