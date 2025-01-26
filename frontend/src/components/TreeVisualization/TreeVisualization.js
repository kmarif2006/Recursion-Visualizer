import React, { useState, useEffect, useRef, useCallback } from 'react';
import { resetStates } from './utils';

const TreeVisualization = ({ recursionData, setProgress, setCurrentMessage, currentStep, isDarkMode }) => {
  const [nodeColors, setNodeColors] = useState({});
  const [activeNodeId, setActiveNodeId] = useState(null);
  const [nodeValues, setNodeValues] = useState({});
  const [completedNodes, setCompletedNodes] = useState(new Set());
  const [animatingNodes, setAnimatingNodes] = useState(new Set());
  const [hoveredNode, setHoveredNode] = useState(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [collapsedNodes, setCollapsedNodes] = useState(new Set());

  // Toggle node collapse state
  const toggleNode = (nodeId, e) => {
    e.stopPropagation();
    setCollapsedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  // Memoize the wheel handler with adjusted zoom parameters
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const scaleSensitivity = 0.001; // Reduced for finer control
    const minScale = 0.1;   // Increased zoom out range
    const maxScale = 4.0;   // Increased zoom in range
    
    const newScale = Math.min(
      Math.max(
        transform.scale - e.deltaY * scaleSensitivity * transform.scale,
        minScale
      ),
      maxScale
    );

    // Calculate zoom point in SVG coordinates
    const container = containerRef.current?.getBoundingClientRect();
    if (!container) return;
    
    const mouseX = e.clientX - container.left;
    const mouseY = e.clientY - container.top;

    // Adjust position to maintain zoom point
    const scaleChange = newScale - transform.scale;
    const newX = transform.x - (mouseX - transform.x) * (scaleChange / transform.scale);
    const newY = transform.y - (mouseY - transform.y) * (scaleChange / transform.scale);

    setTransform({ x: newX, y: newY, scale: newScale });
  }, [transform]);

  // Setup wheel event listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);

  // Pan handling
  const handleMouseDown = (e) => {
    if (e.button === 0) { // Left click only
      setIsDragging(true);
      setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      setTransform(prev => ({ ...prev, x: newX, y: newY }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Reset view
  const handleDoubleClick = () => {
    setTransform({ x: 0, y: 0, scale: 1 });
  };

  // First pass: Calculate node dimensions and tree structure
  const calculateNodeDimensions = (node, level = 0) => {
    const nodeWidth = 80;  // Base width of a node
    const nodeHeight = 45; // Base height of a node
    
    node._dimensions = { width: nodeWidth, height: nodeHeight };
    
    if (!node.children || node.children.length === 0 || collapsedNodes.has(node.id)) {
      node._subtreeWidth = nodeWidth;
      node._subtreeHeight = nodeHeight;
      return;
    }
    
    // Calculate dimensions for all children
    node.children.forEach(child => calculateNodeDimensions(child, level + 1));
    
    // Calculate total width needed for children
    const childrenWidth = node.children.reduce((total, child) => 
      total + child._subtreeWidth, 0);
    
    // Add padding between children
    const padding = (node.children.length - 1) * 20 * Math.pow(1.3, level);
    
    node._subtreeWidth = Math.max(nodeWidth, childrenWidth + padding);
    node._subtreeHeight = nodeHeight + 60 + Math.max(
      ...node.children.map(child => child._subtreeHeight)
    );
  };

  // Second pass: Assign positions to nodes
  const calculateNodePositions = (node, x = 0, y = 0, level = 0, nodes = [], links = []) => {
    const verticalGap = 60 + (level * 10); // Increasing vertical gap with depth
    
    nodes.push({
      id: node.id,
      x,
      y,
      data: node,
      level,
      hasChildren: node.children?.length > 0,
      isCollapsed: collapsedNodes.has(node.id),
      dimensions: node._dimensions
    });

    if (node.children && node.children.length > 0 && !collapsedNodes.has(node.id)) {
      // Calculate starting x position for first child
      let childX = x - (node._subtreeWidth / 2) + (node.children[0]._subtreeWidth / 2);
      
      node.children.forEach((child, index) => {
        // Calculate vertical position with increasing gap based on depth
        const childY = y + verticalGap + node._dimensions.height;
        
        // Create curved link with dynamic control points
        const linkPath = createCurvedLink(
          x, y + node._dimensions.height / 2,
          childX, childY,
          level
        );
        
        links.push({
          id: `${node.id}-${child.id}`,
          path: linkPath,
          sourceId: node.id,
          targetId: child.id
        });

        // Position the child and its subtree
        calculateNodePositions(child, childX, childY, level + 1, nodes, links);
        
        // Move to next child position
        if (index < node.children.length - 1) {
          const currentChildWidth = child._subtreeWidth;
          const nextChildWidth = node.children[index + 1]._subtreeWidth;
          const gap = 20 * Math.pow(1.3, level); // Increasing gap with depth
          childX += (currentChildWidth + nextChildWidth) / 2 + gap;
        }
      });
    }

    return { nodes, links };
  };

  // Helper function to create curved links with dynamic control points
  const createCurvedLink = (startX, startY, endX, endY, level) => {
    const dx = endX - startX;
    const dy = endY - startY;
    const curve = Math.min(Math.abs(dx) * 0.5, dy * 0.5); // Dynamic curve based on distance
    
    return `M ${startX} ${startY}
            C ${startX} ${startY + curve},
              ${endX} ${endY - curve},
              ${endX} ${endY}`;
  };

  useEffect(() => {
    resetStates(setNodeColors, setNodeValues, setCompletedNodes, setActiveNodeId);
    setProgress(0);
    setCurrentMessage('');
    setAnimatingNodes(new Set());

    if (recursionData) {
      const totalNodes = countNodes(recursionData);
      let processedNodes = 0;

      const simulateRecursion = async (node) => {
        // Entry animation
        setAnimatingNodes(prev => new Set(prev).add(node.id));
        setActiveNodeId(node.id);
        setNodeColors(prev => ({ ...prev, [node.id]: '#60A5FA' }));
        setCurrentMessage(`fn(${node.value}) called`);
        await new Promise(resolve => setTimeout(resolve, 800));

        if (node.children && node.children.length > 0) {
          for (const child of node.children) {
            await simulateRecursion(child);
          }
        }

        // Return value animation
        setNodeColors(prev => ({ ...prev, [node.id]: '#22C55E' }));
        setNodeValues(prev => ({ ...prev, [node.id]: node.value }));
        setCurrentMessage(`fn(${node.value}) returns ${node.value}`);
        await new Promise(resolve => setTimeout(resolve, 600));

        processedNodes++;
        setProgress(Math.min((processedNodes / totalNodes) * 100, 100));

        // Completion animation
        setNodeColors(prev => ({ ...prev, [node.id]: '#2563EB' }));
        setCompletedNodes(prev => new Set(prev).add(node.id));
        await new Promise(resolve => setTimeout(resolve, 400));
      };

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

  // Initial setup effect
  useEffect(() => {
    if (recursionData) {
      // Initialize tree layout
      calculateNodeDimensions(recursionData);
    }
  }, [recursionData, collapsedNodes]);

  if (!recursionData) {
    return (
      <div className={`h-full flex items-center justify-center transition-colors duration-200
        ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        Select a function and input to visualize
      </div>
    );
  }

  // Calculate layout
  calculateNodeDimensions(recursionData);
  const { nodes, links } = calculateNodePositions(recursionData);

  // Calculate viewBox with padding
  const padding = 40;
  const viewBox = nodes.reduce(
    (acc, node) => ({
      minX: Math.min(acc.minX, node.x - node.dimensions.width/2),
      maxX: Math.max(acc.maxX, node.x + node.dimensions.width/2),
      minY: Math.min(acc.minY, node.y),
      maxY: Math.max(acc.maxY, node.y + node.dimensions.height)
    }),
    { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity }
  );

  // Add padding to viewBox
  viewBox.minX -= padding;
  viewBox.maxX += padding;
  viewBox.minY -= padding;
  viewBox.maxY += padding;

  return (
    <div className={`h-[500px] rounded-lg overflow-hidden transition-colors duration-200
      ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="h-full">
        <div 
          className="w-full h-full relative overflow-hidden cursor-grab active:cursor-grabbing"
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onDoubleClick={handleDoubleClick}
        >
          {/* Zoom controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
            <button
              className="bg-blue-500 text-white w-8 h-8 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
              onClick={() => setTransform(prev => ({ 
                ...prev, 
                scale: Math.min(prev.scale + 0.2, 2)
              }))}
            >
              +
            </button>
            <button
              className="bg-blue-500 text-white w-8 h-8 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
              onClick={() => setTransform(prev => ({ 
                ...prev, 
                scale: Math.max(prev.scale - 0.2, 0.5)
              }))}
            >
              -
            </button>
            <button
              className="bg-blue-500 text-white w-8 h-8 rounded-full shadow-lg hover:bg-blue-600 transition-colors text-xs"
              onClick={() => setTransform({ x: 0, y: 0, scale: 1 })}
            >
              R
            </button>
          </div>

          <svg
            width="100%"
            height="100%"
            viewBox={`${viewBox.minX} ${viewBox.minY} ${viewBox.maxX - viewBox.minX} ${viewBox.maxY - viewBox.minY}`}
            style={{
              transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
              transformOrigin: '0 0',
              transition: isDragging ? 'none' : 'transform 0.3s ease-out'
            }}
          >
            {/* Render links with improved curves */}
            {links.map(link => (
              <path
                key={link.id}
                d={link.path}
                fill="none"
                className={`stroke-[1.5] ${
                  completedNodes.has(link.sourceId) && completedNodes.has(link.targetId)
                    ? 'stroke-blue-600'
                    : 'stroke-gray-300'
                } transition-all duration-700`}
                style={{
                  opacity: animatingNodes.has(link.targetId) ? 1 : 0,
                  transition: 'opacity 0.5s ease-in-out'
                }}
              />
            ))}

            {/* Render nodes with improved positioning */}
            {nodes.map(node => (
              <g
                key={node.id}
                style={{
                  opacity: animatingNodes.has(node.id) ? 1 : 0,
                  transform: `translate(${node.x}px, ${node.y}px) scale(${
                    node.id === activeNodeId ? 1.1 : 
                    node.id === hoveredNode ? 1.05 : 1
                  })`,
                  transition: 'all 0.3s ease-in-out'
                }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-pointer"
                onClick={(e) => node.hasChildren && toggleNode(node.id, e)}
              >
                {/* Node background glow */}
                <circle
                  r={20}
                  fill={nodeColors[node.id] || '#94A3B8'}
                  className="opacity-20 blur-md"
                  style={{
                    transform: `scale(${node.id === activeNodeId ? 1.5 : 1})`,
                    transition: 'all 0.3s ease-in-out'
                  }}
                />
                
                {/* Main node circle */}
                <circle
                  r={16}
                  fill={nodeColors[node.id] || '#94A3B8'}
                  className={`transition-all duration-300 ${
                    node.id === activeNodeId ? 'filter drop-shadow-lg' : ''
                  }`}
                />

                {/* Node content */}
                <foreignObject x="-50" y="-35" width="100" height="50">
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-[10px] font-medium text-blue-900 bg-blue-50 px-2 py-1 rounded-t-md shadow-sm border border-blue-200 w-full text-center truncate">
                      {node.data.name.split(' = ')[0]}
                    </div>
                    <div className={`text-[11px] font-bold text-white px-2 py-1 rounded-b-md shadow-sm border border-blue-300 w-full text-center ${
                      nodeColors[node.id] === '#22C55E'
                        ? 'bg-green-500'
                        : nodeColors[node.id] === '#2563EB'
                        ? 'bg-blue-600'
                        : 'bg-blue-400'
                    }`}>
                      {nodeValues[node.id] !== undefined ? nodeValues[node.id] : '...'}
                    </div>
                  </div>
                </foreignObject>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TreeVisualization; 