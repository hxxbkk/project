import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import windowsLogo from '../assets/windows-logo.png';
import '../index.css';
import SearchBar from '../components/SearchBar';
import { launchAppByName } from '../AppLauncher';
import App1 from "../App1"
import MapPage from "../pages/mapPage"


const WindowsStart = () => {
  const [isVisible, setVisible] = useState(false);
  const [appVisibility, setAppVisibility] = useState({
    app1: false,
    map: false,
  });

  const handleSearch = (searchText) => {
    launchAppByName(searchText);
  };


  const toggleMenu = () => {
    setVisible(!isVisible);
  };

  const exitButton = () => {
    window.close();
  };

  const toggleAppVisibility = (appName) => {
    setAppVisibility((prevVisibility) => {
      return { ...prevVisibility, [appName]: !prevVisibility[appName] };
    });
  };


  return (
    <div>
      <div className="logo-search-container">
      {/* 시작버튼 */}
      <img className="windows-logo" src={windowsLogo} onClick={toggleMenu} />
      {/* 검색창 */}
      <SearchBar onSearch={handleSearch} />
      </div>

      {/* 메뉴목록 */}
      <div
        className="menu-container"
        style={{
          display: isVisible ? 'block' : 'none',
          position: 'fixed',
          bottom: '50px',
          left: '20px',
          zIndex: 1000,
        }}
      >

        {/* 메뉴 아이템 */}
        <div className="WindowsStart">
          <div
            className="menu-item"
            onClick={() => toggleAppVisibility('app1')}
          >
            TodoList
          </div>
          <div className="menu-item" onClick={() => toggleAppVisibility('map')}>
            지도
          </div>

          {/* 종료버튼 */}
          <button onClick={exitButton}>종료</button>
        </div>
      </div>
      {appVisibility.app1 && (
        <App1 closeApp={() => toggleAppVisibility('app1')} />
      )}
      {appVisibility.map && (
        <MapPage closeApp={() => toggleAppVisibility('map')} />
      )}
    </div>
  );
};

export default WindowsStart;
