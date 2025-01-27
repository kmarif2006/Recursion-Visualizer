import React from 'react';

const RecursionControls = ({ 
  currentStep,
  totalSteps,
  setCurrentStep,
  isPlaying,
  setIsPlaying,
  speed,
  setSpeed,
  isDarkMode 
}) => {
  const handleSliderChange = (e) => {
    setCurrentStep(parseInt(e.target.value));
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStepBackward = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
    setIsPlaying(false);
  };

  const handleStepForward = () => {
    setCurrentStep(prev => Math.min(totalSteps - 1, prev + 1));
    setIsPlaying(false);
  };

  const handleSpeedChange = (e) => {
    setSpeed(parseFloat(e.target.value));
  };

  return (
    <div className={`p-4 rounded-lg shadow-md ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="flex items-center justify-between space-x-4">
        {/* Step Counter */}
        <span className={`text-sm font-medium ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Step {currentStep + 1} of {totalSteps}
        </span>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          {/* Step Backward */}
          <button
            onClick={handleStepBackward}
            disabled={currentStep === 0}
            className={`p-2 rounded-full ${
              isDarkMode 
                ? 'hover:bg-gray-700 disabled:text-gray-600' 
                : 'hover:bg-gray-100 disabled:text-gray-300'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Play/Pause */}
          <button
            onClick={handlePlayPause}
            className={`p-2 rounded-full ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            )}
          </button>

          {/* Step Forward */}
          <button
            onClick={handleStepForward}
            disabled={currentStep === totalSteps - 1}
            className={`p-2 rounded-full ${
              isDarkMode 
                ? 'hover:bg-gray-700 disabled:text-gray-600' 
                : 'hover:bg-gray-100 disabled:text-gray-300'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Speed Control */}
        <div className="flex items-center space-x-2">
          <span className={`text-sm ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Speed:
          </span>
          <select
            value={speed}
            onChange={handleSpeedChange}
            className={`px-2 py-1 rounded text-sm ${
              isDarkMode 
                ? 'bg-gray-700 text-white border-gray-600' 
                : 'bg-white text-gray-800 border-gray-300'
            }`}
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
        </div>
      </div>

      {/* Step Slider */}
      <div className="mt-4">
        <input
          type="range"
          min={0}
          max={totalSteps - 1}
          value={currentStep}
          onChange={handleSliderChange}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default RecursionControls; 