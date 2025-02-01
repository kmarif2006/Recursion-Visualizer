import React, { useState } from 'react';

const Resizer = ({ onResize }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (onResize) {
      const percentage = (e.clientX / window.innerWidth) * 100;
      const limitedPercentage = Math.min(Math.max(percentage, 15), 50);
      //clamp the percentage between 15% and 50%
      onResize(limitedPercentage);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div 
      className={`
        select-none transition-transform duration-75
        ${isDragging ? 'scale-110' : 'hover:scale-105'}
      `}
      onMouseDown={handleMouseDown}
    >
      <div className={`
        w-4 h-16 
        bg-blue-100 
        rounded-full 
        border-2 
        border-blue-300
        hover:bg-blue-200
        flex 
        items-center 
        justify-center
        shadow-lg
        transition-all
        duration-150
        ${isDragging ? 'bg-blue-300 shadow-xl' : ''}
      `}>
        <div className="flex flex-col gap-1">
          <div className={`
            w-1 h-1 
            bg-blue-500 
            rounded-full 
            transition-all 
            duration-150
            ${isDragging ? 'scale-110' : ''}
          `}></div>
          <div className={`
            w-1 h-1 
            bg-blue-500 
            rounded-full 
            transition-all 
            duration-150
            ${isDragging ? 'scale-110' : ''}
          `}></div>
          <div className={`
            w-1 h-1 
            bg-blue-500 
            rounded-full 
            transition-all 
            duration-150
            ${isDragging ? 'scale-110' : ''}
          `}></div>
        </div>
      </div>
    </div>
  );
};

export default Resizer; 