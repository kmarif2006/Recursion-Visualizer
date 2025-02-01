import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Controls from './components/Controls/Controls';
import TreeVisualization from './components/TreeVisualization/TreeVisualization';
import ControlPanel from './components/Controls/ControlPanel';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import CodeViewer from './components/CodeViewer/CodeViewer';
import Resizer from './components/Resizer/Resizer';
import { generateRecursionTree } from './Services/api';

function App() {
  //useState hooks
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [recursionData, setRecursionData] = useState(null);
  const [functionName, setFunctionName] = useState("Fibonacci");
  const [inputValue, setInputValue] = useState("5");
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [codeWidth, setCodeWidth] = useState(25);

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle dark mode logic
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Generate tree logic
  const handleGenerateTree = async () => {
    try {
      const data = await generateRecursionTree(functionName, inputValue);
      setRecursionData(data);
      setProgress(0);
      setCurrentMessage('Tree generated successfully!');
      setCurrentStep(0);
    } catch (error) {
      console.error('Error generating tree:', error);
      setCurrentMessage('Error generating tree.');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 
      ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <Header isDarkMode={isDarkMode} />
        <Controls 
          functionName={functionName}
          setFunctionName={setFunctionName}
          inputValue={inputValue}
          setInputValue={setInputValue}
          onGenerateTree={handleGenerateTree}
          isDarkMode={isDarkMode}
        />
        
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-4 
          transition-colors duration-200`}>
          <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">
            Progress Bar
          </h2>
          <ControlPanel 
            progress={progress}
            currentMessage={currentMessage}
          />
        </div>

        <div className="flex h-[70vh] relative items-stretch">
          <div 
            className={`rounded-l-lg shadow-lg p-4 overflow-auto transition-all duration-200
              ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            style={{ width: `${codeWidth}%` }}
          >
            <CodeViewer 
              functionName={functionName} 
              isDarkMode={isDarkMode} 
            />
          </div>

          <div className="w-8 flex items-center justify-center bg-gray-50 dark:bg-gray-700">
            <Resizer onResize={setCodeWidth} />
          </div>

          <div 
            className={`rounded-r-lg shadow-lg p-4 relative transition-all duration-200
              ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            style={{ width: `${100 - codeWidth - 2}%` }}
          >
            <TreeVisualization 
              recursionData={recursionData} 
              setProgress={setProgress}
              setCurrentMessage={setCurrentMessage}
              currentStep={currentStep}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
