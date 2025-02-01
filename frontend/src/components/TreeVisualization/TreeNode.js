const TreeNode = ({ nodeDataProps, nodeFillColors, currentProcessingNodeId, computedNodeValues, finishedNodes }) => {
  const nodeDatum = nodeDataProps.nodeDatum;
  const [functionCall] = nodeDatum.name.split(' = ');
  const isActive = nodeDatum.id === currentProcessingNodeId;
  const isCompleted = finishedNodes.has(nodeDatum.id);
  const nodeValue = computedNodeValues[nodeDatum.id];

  return (
    <g>
      <circle 
        r={isActive ? "16" : "12"}
        fill={nodeFillColors[nodeDatum.id] || '#94A3B8'}
        className={`transition-all duration-300 ${isActive ? 'filter drop-shadow-lg' : ''}`}
      />
      <foreignObject 
        x="-50"
        y="-35"
        width="100"
        height="50"
        style={{ overflow: 'visible' }}
      >
        <div className={`flex flex-col items-center justify-center transition-all duration-300 ${isActive ? 'scale-110' : ''} ${isCompleted ? 'opacity-100' : 'opacity-80'}`}>
          <div className="text-[9px] font-medium text-blue-900 bg-blue-50 px-1.5 py-0.5 rounded-t-md shadow-sm border border-blue-200 w-full text-center truncate">
            {functionCall}
          </div>
          <div className={`text-[10px] font-bold text-white px-1.5 py-0.5 rounded-b-md shadow-sm border border-blue-300 w-full text-center transition-all duration-300 ${nodeFillColors[nodeDatum.id] === '#22C55E' ? 'bg-green-500' : nodeFillColors[nodeDatum.id] === '#2563EB' ? 'bg-blue-600' : 'bg-blue-400'}`}>
            {nodeValue !== undefined ? nodeValue : '...'}
          </div>
        </div>
      </foreignObject>
    </g>
  );
};
