import React, { useState, useEffect } from 'react';
import { Tree } from "react-d3-tree";

const TreeVisualization = ({ recursionData }) => {
  const [nodeColors, setNodeColors] = useState({});
  const [activeNodeId, setActiveNodeId] = useState(null);

  useEffect(() => {
    if (recursionData) {
      const simulateRecursion = async (node, depth = 0) => {
        setActiveNodeId(node.id);
        setNodeColors(prev => ({ ...prev, [node.id]: '#60A5FA' }));
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (node.children) {
          for (const child of node.children) {
            await simulateRecursion(child, depth + 1);
          }
        }
        
        setNodeColors(prev => ({ ...prev, [node.id]: '#2563EB' }));
        await new Promise(resolve => setTimeout(resolve, 500));
      };

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
        translate={{ x: window.innerWidth / 2, y: 50 }}
        separation={{ siblings: 0.8, nonSiblings: 1.2 }}
        nodeSize={{ x: 160, y: 80 }}
        pathClassFunc={() => 'stroke-blue-400 transition-all duration-300'}
        renderCustomNodeElement={(rd3tProps) => {
          const nodeDatum = rd3tProps.nodeDatum;
          const [functionCall, result] = nodeDatum.name.split(' = ');
          const isActive = nodeDatum.id === activeNodeId;
          
          return (
            <g>
              <circle 
                r={isActive ? "20" : "15"}
                fill={nodeColors[nodeDatum.id] || '#3B82F6'}
                className="transition-all duration-300"
              />
              <foreignObject 
                x="-80"
                y="-50"
                width="160"
                height="70"
                style={{ overflow: 'visible' }}
              >
                <div className={`flex flex-col items-center justify-center transition-all duration-300 ${isActive ? 'scale-110' : ''}`}>
                  <div className="text-xs font-medium text-blue-900 bg-blue-50 px-3 py-1 rounded-t-md shadow-sm border border-blue-200 w-full text-center">
                    {functionCall}
                  </div>
                  <div className={`text-xs font-bold text-white px-3 py-1 rounded-b-md shadow-sm border border-blue-300 w-full text-center ${
                    nodeColors[nodeDatum.id] ? 'bg-blue-600' : 'bg-blue-400'
                  }`}>
                    {result || '...'}
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