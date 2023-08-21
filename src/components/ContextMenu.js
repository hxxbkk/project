import React, { useEffect } from 'react';
import '../CSS/ContextMenu.css';

function ContextMenu({ visible, x, y, onClose, onFolderCreate }) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.context-menu')) {
        if (typeof onClose === 'function') {
          onClose();
        }
      }
      
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [onClose]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className="context-menu"
      style={{ top: y, left: x }}
      tabIndex="0"
      onBlur={ () => { if (typeof onClose === 'function') { onClose(); } } }
    >
      <ul>
        <li onClick={onFolderCreate}>폴더 생성</li>
      </ul>
    </div>
  );
}

export default ContextMenu;
