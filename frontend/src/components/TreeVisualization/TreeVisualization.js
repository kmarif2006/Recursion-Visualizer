import React, { useState, useEffect } from 'react';
import { Tree } from "react-d3-tree";
import TreeNode from './TreeNode';
import { resetStates } from './utils';

const TreeVisualization = ({ recursionData }) => {
  const [nodeColors, setNodeColors] = useState({});
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [nodeValues, setNodeValues] = useState({});
  const [completedNodes, setCompletedNodes] = useState(new Set());

  useEffect(() => {
    resetStates(setNodeColors, setNodeValues, setCompletedNodes, setActiveNodeId);

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
          return `stroke-2 ${targetCompleted && sourceCompleted ? 'stroke-blue-600' : 'stroke-gray-300'} transition-all duration-500`;
        }}
        renderCustomNodeElement={(rd3tProps) => <TreeNode rd3tProps={rd3tProps} nodeColors={nodeColors} activeNodeId={activeNodeId} nodeValues={nodeValues} completedNodes={completedNodes} />}
      />
    </div>
  );
};

export default TreeVisualization; 