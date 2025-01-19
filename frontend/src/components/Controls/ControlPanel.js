import React from 'react';

const ControlPanel = ({ onAction1, onAction2, onAction3, onAction4, progress, currentMessage }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center w-full mb-2">
        <div className="flex space-x-1 mr-2">
          <button onClick={onAction1} className="px-1 py-0.5 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">
            A1
          </button>
          <button onClick={onAction2} className="px-1 py-0.5 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">
            A2
          </button>
        </div>
        <div className="relative w-full h-2 bg-gray-300 rounded mx-2">
          <div className="absolute h-full bg-blue-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="flex space-x-1 ml-2">
          <button onClick={onAction3} className="px-1 py-0.5 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">
            A3
          </button>
          <button onClick={onAction4} className="px-1 py-0.5 text-xs bg-blue-500 text-white rounded hover:bg-blue-600">
            A4
          </button>
        </div>
      </div>
      <div className="w-full text-center">
        <p className="text-blue-700 font-semibold">{currentMessage}</p>
      </div>
    </div>
  );
};

export default ControlPanel;