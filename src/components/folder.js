import React from 'react';
import '../CSS/folder.css';


function Folder({ folderName, folderId, onDrop }) {
  // 드롭 이벤트 처리
  const handleDrop = (event) => {
    event.stopPropagation();
    event.preventDefault();

    const data = JSON.parse(event.dataTransfer.getData('text'));
    onDrop({ ...data, folderId });
    event.target.style.border = "none"; // 드랍 이벤트 발생 후 테두리 스타일 초기화
  };

  // 드래그 오버 이벤트 처리 (드롭 허용)
  const handleDragOver = (event) => {
  event.stopPropagation();
  event.preventDefault();
  event.target.style.border = "2px solid #5e6b89"; // 드래그 오버된 영역 테두리 스타일 변경
  };

  return (
    
    <div
      className="folder-container"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <img
        src={require('../assets/folder-icon.png')}
        alt="Folder"
        className="folder-image"
      />
      <div className="folder-name">{folderName}</div>
    </div>
  );
}

export default Folder;
