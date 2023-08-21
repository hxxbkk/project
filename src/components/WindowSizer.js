import React, { useState } from 'react';

function WindowSizer({ children,className, initialWidth, initialHeight, minWidth, minHeight  }) {
  const [dimensions, setDimensions] = useState({ width: initialWidth, height: initialHeight });
  // ...
  // 드래그 시작 시, 현재 마우스 위치를 추적
  const handleMouseDown = (e) => {
    e.preventDefault();
    const initialMouseX = e.clientX;
    const initialMouseY = e.clientY;

    // 창 사이즈 업데이트 함수를 연결
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - initialMouseX;
      const deltaY = e.clientY - initialMouseY;
      const newWidth = Math.max(dimensions.width + deltaX, minWidth);
      const newHeight = Math.max(dimensions.height + deltaY, minHeight);

      setDimensions({ width: newWidth, height: newHeight });
    };

    // 이벤트 리스너를 추가하고 제거
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
    className={className}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        position: 'relative',
      }}
    >
      {children}
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          position: 'absolute',
          right: -5,
          bottom: -5,
          cursor: 'nwse-resize',
          backgroundColor: 'black',
        }}
        onMouseDown={handleMouseDown}
      ></div>
    </div>
  );
}

export default WindowSizer;
