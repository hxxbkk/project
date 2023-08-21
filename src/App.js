import { addFolder } from './IndexedDB';
import React from 'react';
import App1 from './App1';
import MapPage from './pages/mapPage';
import Draggable from 'react-draggable';
import ContextMenu from './components/ContextMenu';
import Folder from './components/folder';
import MapImage from '../src/assets/map-icon.png';
import Todolist from '../src/assets/todolist.png';
import WindowsStart from './components/WindowsStart';
import { useState, useEffect } from 'react';

function App() {
  const onDragStart = (event, type) => {
    const data = {
      id: Date.now(),
      type,
      src: type === 'app1Icon' ? Todolist : MapImage,
      name: type === 'app1Icon' ? 'TodoList' : '지도',
    };

    // 데이터를 JSON으로 변환하여 드래그 이벤트에 연결
    event.dataTransfer.setData('text', JSON.stringify(data));
    event.dataTransfer.effectAllowed = 'move';

    event.target.classList.add('app_icon_dragging');
  };

  const onDragEnd = (event) => {
    // 이미지 클래스 원래대로 돌리기
    event.target.classList.remove('app_icon_dragging');
  };

  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString()
  );

  useEffect(() => {
    const updateTime = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(updateTime);
  }, []);

  useEffect(() => {
    const updateDate = setInterval(() => {
      setCurrentDate(new Date().toLocaleDateString());
    }, 86400000); // 24시간 간격으로 다시 렌더링 (1000 ms * 60 * 60 * 24)

    return () => clearInterval(updateDate);
  }, []);

  const [dragging, setDragging] = useState(false);
  const [isOpenApp1, setIsOpenApp1] = useState(false);
  const [isOpenApp2, setIsOpenApp2] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [folders, setFolders] = useState([]); // 추가: 폴더 상태

  const [droppedIcons, setDroppedIcons] = useState([]);

  const handleDragStart = (event) => {
    event.stopPropagation();
    setDragging(true);
  };

  const handleDragStop = (event) => {
    event.stopImmediatePropagation();
    setTimeout(() => {
      setDragging(false);
    }, 100); // 일정 시간 동안 클릭 이벤트를 막기 위해서
  };

  const openApp1 = () => {
    if (!dragging) {
      setIsOpenApp1(true);
      setIsFullscreen(true);
    }
  };

  const openMap = () => {
    if (!dragging) {
      setIsOpenApp2(true);
      setIsFullscreen(true);
    }
  };

  const closeApp = () => {
    setIsOpenApp1(false);
    setIsOpenApp2(false);
    setIsFullscreen(false);
  };

  // 폴더 생성
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [contextMenuX, setContextMenuX] = useState(0);
  const [contextMenuY, setContextMenuY] = useState(0);

  const handleFolderCreate = async (event) => {
    event.stopPropagation();

    // 클릭 좌표를 얻음
    const x = event.clientX;
    const y = event.clientY;

    const newFolderName = '새폴더';
    const newFolderId = await addFolder(newFolderName); // 추가: 폴더를 IndexedDB에 추가
    setFolders([
      ...folders,
      { id: newFolderId, name: newFolderName, icons: [], x: x, y: y },
    ]);

    console.log('Folder created');
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenuVisible(true);
    setContextMenuX(event.clientX);
    setContextMenuY(event.clientY);
  };

  const handleCloseContextMenu = () => {
    setContextMenuVisible(false);
  };

  const onDrop = (data) => {
    console.log('Dropped data:', data);
    setFolders(
      folders.map((folder) => {
        if (folder.id === data.folderId) {
          return { ...folder, icons: [...folder.icons, data] };
        }
        return folder;
      })
    );
    setDroppedIcons([...droppedIcons, data.type]);
  };
  const isDropped = (type) => {
    return droppedIcons.includes(type);
  };

  const appIcons = [
    {
      id: Date.now(),
      type: 'app1Icon',
      src: Todolist,
      name: 'TodoList',
      onClick: openApp1,
      onDragStart: onDragStart,
      onDragEnd: onDragEnd,
    },
    {
      id: Date.now() + 1, //중복되지 않는 id 생성 위해서
      type: 'app2Icon',
      src: MapImage,
      name: '지도',
      onClick: openMap,
      onDragStart: onDragStart,
      onDragEnd: onDragEnd,
    },
  ];

  return (
    <div>
      <h1 className="gradient-text" data-text="Project">
        Project
      </h1>
      <WindowsStart />
      <div className="taskbar">
        <div id="current-date">{currentDate}</div>
        <div id="current-time">{currentTime}</div>
      </div>

      {/* 컨텍스트 메뉴를 사용하기 원하는 부분에 onContextMenu 이벤트를 추가 */}
      <div className="flex-container" onContextMenu={handleContextMenu}>
        <div className="flex-container">
          {folders.map((folder, index) => (
            <Draggable key={index}>
              <div
                style={{ position: 'absolute', left: folder.x, top: folder.y }}
              >
                <Folder
                  folderName={folder.name}
                  folderId={folder.id}
                  icons={folder.icons} // 폴더에 있는 아이콘 목록 추가
                  onDrop={({ id, type, folderId }) =>
                    onDrop({
                      id,
                      type,
                      src: type === 'app1Icon' ? Todolist : MapImage,
                      name: type === 'app1Icon' ? 'TodoList' : '지도',
                      folderId,
                    })
                  }
                />
              </div>
            </Draggable>
          ))}
          <div className="icons-container" style={{ zIndex: 1 }}>
            {appIcons.map((icon, index) => (
              <Draggable
                onStart={handleDragStart}
                onStop={handleDragStop}
                key={index}
              >
                <div
                  className={`icon ${
                    isDropped(icon.type) ? 'app_icon_dropped' : ''
                  }`}
                  onClick={icon.onClick}
                  draggable
                  onDragStart={(event) => onDragStart(event, icon.type)}
                  onDragEnd={icon.onDragEnd}
                >
                  <span className="icon-content">
                    <img src={icon.src} alt={icon.type} className="icon-img" />
                    <div
                      className={`icon-label ${
                        isDropped(icon.type) ? 'label-hidden' : ''
                      }`}
                    >
                      {icon.name}
                    </div>
                  </span>
                </div>
              </Draggable>
            ))}
          </div>
        </div>
        {isOpenApp1 && (
          <div>
            <App1 closeApp={closeApp} />
          </div>
        )}
        {isOpenApp2 && (
          <div>
            <MapPage closeApp={closeApp} />
          </div>
        )}
      </div>

      {/* ContextMenu의 위치와 동작을 설정*/}
      <ContextMenu
        visible={contextMenuVisible}
        x={contextMenuX}
        y={contextMenuY}
        onClose={handleCloseContextMenu}
        onFolderCreate={handleFolderCreate}
      />
    </div>
  );
}

export default App;
