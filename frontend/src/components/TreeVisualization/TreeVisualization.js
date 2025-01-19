import React, { useState, useEffect } from 'react';
import { Tree } from "react-d3-tree";
import TreeNode from './TreeNode';
import { resetStates } from './utils';

const TreeVisualization = ({ recursionData, setProgress, setCurrentMessage, currentStep }) => {
  const [nodeColors, setNodeColors] = useState({});
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [nodeValues, setNodeValues] = useState({});
  const [completedNodes, setCompletedNodes] = useState(new Set());

  useEffect(() => {
    resetStates(setNodeColors, setNodeValues, setCompletedNodes, setActiveNodeId);
    setProgress(0);
    setCurrentMessage('');

    if (recursionData) {
      const totalNodes = countNodes(recursionData);
      let processedNodes = 0;

      const simulateRecursion = async (node) => {
        setActiveNodeId(node.id);
        setNodeColors(prev => ({ ...prev, [node.id]: '#60A5FA' }));
        setCurrentMessage(`fn(${node.value}) called`);
        await new Promise(resolve => setTimeout(resolve, 800));

        if (node.children && node.children.length > 0) {
          for (const child of node.children) {
            await simulateRecursion(child);
          }
        } else {
          setNodeColors(prev => ({ ...prev, [node.id]: '#22C55E' }));
          setNodeValues(prev => ({ ...prev, [node.id]: node.value }));
          setCurrentMessage(`fn(${node.value}) returns ${node.value}`);
          await new Promise(resolve => setTimeout(resolve, 600));
        }

        processedNodes++;
        setProgress(Math.min((processedNodes / totalNodes) * 100, 100));

        setNodeValues(prev => ({ ...prev, [node.id]: node.value }));
        setNodeColors(prev => ({ ...prev, [node.id]: '#2563EB' }));
        setCompletedNodes(prev => new Set(prev).add(node.id));
        
        await new Promise(resolve => setTimeout(resolve, 600));
      };

      // Start the simulation from the current step
      const startNode = getNodeAtStep(recursionData, currentStep);
      if (startNode) {
        simulateRecursion(startNode);
      }
    }
  }, [recursionData, setProgress, setCurrentMessage, currentStep]);

  const countNodes = (node) => {
    let count = 1;
    if (node.children) {
      node.children.forEach(child => {
        count += countNodes(child);
      });
    }
    return count;
  };

  const getNodeAtStep = (node, step) => {
    let count = 0;
    const traverse = (currentNode) => {
      if (count === step) return currentNode;
      count++;
      if (currentNode.children) {
        for (const child of currentNode.children) {
          const result = traverse(child);
          if (result) return result;
        }
      }
      return null;
    };
    return traverse(node);
  };

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