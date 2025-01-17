import React from 'react';
import { Tree } from "react-d3-tree";

const TreeVisualization = ({ recursionData }) => {
  if (!recursionData) {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-blue-400">
        Generate a tree to visualize recursion
      </div>
    );
  }

  return (
    <Tree 
      data={recursionData}
      orientation="vertical"
      translate={{ x: window.innerWidth / 2, y: 50 }}
      separation={{ siblings: 0.8, nonSiblings: 1.2 }}
      nodeSize={{ x: 200, y: 100 }}
      pathClassFunc={() => 'stroke-blue-400'}
      renderCustomNodeElement={(rd3tProps) => {
        const nodeName = rd3tProps.nodeDatum.name;
        const [functionCall, result] = nodeName.split(' = ');
        
        return (
          <g>
            <circle r="25" fill="#3B82F6" />
            <foreignObject 
              x="-100" 
              y="-60" 
              width="200" 
              height="80"
              style={{ overflow: 'visible' }}
            >
              <div className="flex flex-col items-center justify-center">
                <div className="text-sm font-medium text-blue-900 bg-blue-50 px-3 py-1 rounded-t-md shadow-sm border border-blue-200">
                  {functionCall}
                </div>
                <div className="text-sm font-bold text-white bg-blue-600 px-3 py-1 rounded-b-md shadow-sm border border-blue-300">
                   {result}
                </div>
              </div>
            </foreignObject>
          </g>
        );
      }}
    />
  );
};

export default TreeVisualization; 