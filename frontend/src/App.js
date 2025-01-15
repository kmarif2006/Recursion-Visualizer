import React,{useState} from 'react';
import {Tree} from "react-d3-tree";
function App() {
  const[recursionData,setRecursionData] = useState(null);
  const [functionName,setFunctionName] = useState("Fibonacci");
  const [inputValue,setInputValue] = useState(5); 
  //fibonacci function
  const fibonacci = (n,level=0) => {
    if(n<=1){
      return {
        name: `Fibonacci(${n}) = ${n}`,
        value: n,
        children: []
      };
    }
    const left = fibonacci(n-1,level+1);
    const right = fibonacci(n-2,level+1);
    const value = left.value + right.value;
    return {
      name: `Fibonacci(${n}) = ${value}`,
      value: value,
      children: [left, right]
    };
  };
  //factorial function
  const factorial=(n,level=0)=>{
    if(n===0 || n===1){
      return {name:`Factorial(${n}) = 1`,value:1,children:[]};
    }
    const child = factorial(n-1,level+1);
    const value = n * child.value;
    return {
      name: `Factorial(${n}) = ${value}`,
      value: value,
      children: [child]
    };
  };
  const generateTree = () => {
    let data;
    if (functionName === "Fibonacci") {
      data = fibonacci(inputValue);
    } else {
      data = factorial(inputValue);
    }
    setRecursionData(data);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
          Recursion Tree Visualizer
        </h1>
        
        {/* Controls Section */}
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-center">
            {/* Function Selector */}
            <select 
              value={functionName} 
              onChange={(e) => setFunctionName(e.target.value)}
              className="px-4 py-2 rounded-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
            >
              <option value="Fibonacci">Fibonacci</option>
              <option value="Factorial">Factorial</option>
            </select>

            {/* Number Input */}
            <input 
              type="number" 
              value={inputValue}
              onChange={(e) => setInputValue(parseInt(e.target.value))}
              className="px-4 py-2 rounded-md border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 w-28"
            />

            {/* Generate Button */}
            <button 
              onClick={generateTree}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
                       transition-colors duration-200 focus:outline-none focus:ring-2 
                       focus:ring-blue-400 focus:ring-offset-2"
            >
              Visualize
            </button>
          </div>
        </div>

        {/* Tree Visualization Section */}
        <div className="bg-white rounded-lg shadow-lg p-4 h-[70vh] relative">
          {!recursionData && (
            <div className="absolute inset-0 flex items-center justify-center text-blue-400">
              Generate a tree to visualize recursion
            </div>
          )}
          {recursionData && (
            <Tree 
              data={recursionData}
              orientation="vertical"
              translate={{ x: window.innerWidth / 2, y: 50 }}
              separation={{ siblings: 1.5, nonSiblings: 2 }}
              nodeSize={{ x: 200, y: 100 }}
              pathClassFunc={() => 'stroke-blue-400'}
              renderCustomNodeElement={(rd3tProps) => (
                <g>
                  <circle r="20" fill="#3B82F6" />
                  <foreignObject 
                    x="-100" 
                    y="-20" 
                    width="200" 
                    height="40"
                    style={{ overflow: 'visible' }}
                  >
                    <div className="flex items-center justify-center text-center text-sm text-blue-800 bg-blue-50 p-2 rounded-md shadow-sm">
                      {rd3tProps.nodeDatum.name}
                    </div>
                  </foreignObject>
                </g>
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
