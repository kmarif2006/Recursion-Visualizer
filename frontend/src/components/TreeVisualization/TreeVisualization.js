import React, { useState, useEffect } from 'react';
import { Tree } from "react-d3-tree";

const TreeVisualization = ({ recursionData }) => {
  const [nodeColors, setNodeColors] = useState({});
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [nodeValues, setNodeValues] = useState({});
  const [completedNodes, setCompletedNodes] = useState(new Set());

  useEffect(() => {
    if (recursionData) {
      const simulateRecursion = async (node, depth = 0) => {
        // Entering the function call
        setActiveNodeId(node.id);
        setNodeColors(prev => ({ ...prev, [node.id]: '#60A5FA' }));
        await new Promise(resolve => setTimeout(resolve, 800));

        // Process children if they exist
        if (node.children && node.children.length > 0) {
          for (const child of node.children) {
            await simulateRecursion(child, depth + 1);
          }
        } else {
          // Base case reached
          setNodeColors(prev => ({ ...prev, [node.id]: '#22C55E' }));
          setNodeValues(prev => ({ ...prev, [node.id]: node.value }));
          await new Promise(resolve => setTimeout(resolve, 600));
        }

        // Calculate and show return value
        setNodeValues(prev => ({ ...prev, [node.id]: node.value }));
        setNodeColors(prev => ({ ...prev, [node.id]: '#2563EB' }));
        setCompletedNodes(prev => new Set(prev).add(node.id));
        
        await new Promise(resolve => setTimeout(resolve, 600));
      };

      setNodeColors({});
      setNodeValues({});
      setCompletedNodes(new Set());
      simulateRecursion(recursionData);
    }
  }, [recursionData]);

  if (!recursionData) {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-blue-400">
        Generate a tree to visualize recursion
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Tree 
        data={recursionData}
        orientation="vertical"
        translate={{ x: window.innerWidth / 2, y: 80 }}
        separation={{ siblings: 1.2, nonSiblings: 1.8 }}
        nodeSize={{ x: 140, y: 100 }}
        pathClassFunc={(link) => {
          const targetCompleted = completedNodes.has(link.target.data.id);
          const sourceCompleted = completedNodes.has(link.source.data.id);
          return `stroke-2 ${
            targetCompleted && sourceCompleted
              ? 'stroke-blue-600'
              : 'stroke-gray-300'
          } transition-all duration-500`;
        }}
        renderCustomNodeElement={(rd3tProps) => {
          const nodeDatum = rd3tProps.nodeDatum;
          const [functionCall] = nodeDatum.name.split(' = ');
          const isActive = nodeDatum.id === activeNodeId;
          const isCompleted = completedNodes.has(nodeDatum.id);
          const nodeValue = nodeValues[nodeDatum.id];
          
          return (
            <g>
              <circle 
                r={isActive ? "16" : "12"}
                fill={nodeColors[nodeDatum.id] || '#94A3B8'}
                className={`transition-all duration-300 ${
                  isActive ? 'filter drop-shadow-lg' : ''
                }`}
              />
              <foreignObject 
                x="-50"
                y="-35"
                width="100"
                height="50"
                style={{ overflow: 'visible' }}
              >
                <div className={`flex flex-col items-center justify-center transition-all duration-300 
                  ${isActive ? 'scale-110' : ''} 
                  ${isCompleted ? 'opacity-100' : 'opacity-80'}`}
                >
                  <div className="text-[9px] font-medium text-blue-900 bg-blue-50 px-1.5 py-0.5 
                    rounded-t-md shadow-sm border border-blue-200 w-full text-center truncate">
                    {functionCall}
                  </div>
                  <div className={`text-[10px] font-bold text-white px-1.5 py-0.5 rounded-b-md 
                    shadow-sm border border-blue-300 w-full text-center transition-all duration-300 ${
                    nodeColors[nodeDatum.id] === '#22C55E'
                      ? 'bg-green-500'
                      : nodeColors[nodeDatum.id] === '#2563EB'
                      ? 'bg-blue-600'
                      : 'bg-blue-400'
                  }`}>
                    {nodeValue !== undefined ? nodeValue : '...'}
                  </div>
                </div>
              </foreignObject>
            </g>
          );
        }}
      />
    </div>
  );
};

export default TreeVisualization; 