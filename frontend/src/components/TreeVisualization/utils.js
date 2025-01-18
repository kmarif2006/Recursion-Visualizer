export const resetStates = (setNodeColors, setNodeValues, setCompletedNodes, setActiveNodeId) => {
  setNodeColors({});
  setNodeValues({});
  setCompletedNodes(new Set());
  setActiveNodeId(null);
}; 