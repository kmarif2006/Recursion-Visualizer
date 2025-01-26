import React, { useState } from 'react';
import Header from './components/Header/Header';
import Controls from './components/Controls/Controls';
import TreeVisualization from './components/TreeVisualization/TreeVisualization';
import ControlPanel from './components/Controls/ControlPanel';
import { generateRecursionTree } from './Services/api';
import CodeViewer from './components/CodeViewer/CodeViewer';
import Resizer from './components/Resizer/Resizer';

function App() {
  const [recursionData, setRecursionData] = useState(null);
  const [functionName, setFunctionName] = useState("Fibonacci");
  const [inputValue, setInputValue] = useState(5);
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [codeWidth, setCodeWidth] = useState(25); // Initial width percentage

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

  const handleAction1 = () => {
    setCurrentStep(0);
    setCurrentMessage('Reset to the beginning of the visualization.');
  };

  const handleAction2 = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
    setCurrentMessage('Moved one step back in the visualization.');
  };

  const handleAction3 = () => {
    setCurrentStep(prev => Math.min(prev + 1, recursionData ? countNodes(recursionData) - 1 : 0));
    setCurrentMessage('Moved one step forward in the visualization.');
  };

  const handleAction4 = () => {
    setCurrentStep(recursionData ? countNodes(recursionData) - 1 : 0);
    setCurrentMessage('Jumped to the end of the visualization.');
  };

  const countNodes = (node) => {
    let count = 1;
    if (node.children) {
      node.children.forEach(child => {
        count += countNodes(child);
      });
    }
    return count;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <Controls 
          functionName={functionName}
          setFunctionName={setFunctionName}
          inputValue={inputValue}
          setInputValue={setInputValue}
          onGenerateTree={handleGenerateTree}
        />
        
        {/* Visualization Controls Panel */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Visualization Controls</h2>
          <ControlPanel 
            onAction1={handleAction1}
            onAction2={handleAction2}
            onAction3={handleAction3}
            onAction4={handleAction4}
            progress={progress}
            currentMessage={currentMessage}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex h-[70vh] relative items-stretch">
          {/* Code Implementation */}
          <div 
            className="bg-white rounded-l-lg shadow-lg p-4 overflow-auto transition-all duration-150 ease-in-out"
            style={{ width: `${codeWidth}%` }}
          >
            <h2 className="text-lg font-semibold text-blue-800 mb-2">Code Implementation</h2>
            <CodeViewer functionName={functionName} />
          </div>

          {/* Resizer Container */}
          <div className="w-8 flex items-center justify-center bg-gray-50">
            <Resizer onResize={setCodeWidth} />
          </div>

          {/* Tree Visualization */}
          <div 
            className="bg-white rounded-r-lg shadow-lg p-4 relative transition-all duration-150 ease-in-out"
            style={{ width: `${100 - codeWidth - 2}%` }}
          >
            <TreeVisualization 
              recursionData={recursionData} 
              setProgress={setProgress}
              setCurrentMessage={setCurrentMessage}
              currentStep={currentStep}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
