import React, { useState } from 'react';
import Header from './components/Header/Header';
import Controls from './components/Controls/Controls';
import TreeVisualization from './components/TreeVisualization/TreeVisualization';
import { generateRecursionTree } from './Services/api';

function App() {
  const [recursionData, setRecursionData] = useState(null);
  const [functionName, setFunctionName] = useState("Fibonacci");
  const [inputValue, setInputValue] = useState(5);

  const handleGenerateTree = async () => {
    try {
      const data = await generateRecursionTree(functionName, inputValue);
      setRecursionData(data);
    } catch (error) {
      console.error('Error generating tree:', error);
    }
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
        <div className="bg-white rounded-lg shadow-lg p-4 h-[70vh] relative">
          <TreeVisualization recursionData={recursionData} />
        </div>
      </div>
    </div>
  );
}

export default App;
