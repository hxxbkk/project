import React, { useEffect } from 'react';
import '../CSS/mapPage.css';
import '../App.css';

function MapPage({ closeApp }) {
  const apiKey = process.env.REACT_APP_API_KEY;
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
    script.async = true;

    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(
            37.554668024641515,
            126.97059786786713
          ),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);
        map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.TRAFFIC); //교통 정보 표시
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey]);

  return (
    <div className="map-container fullscreen"  style={{ position: 'fixed', zIndex: 1000 }}>
      <button className="close-button" onClick={closeApp}>
        x
      </button>
      <div id="map" style={{ width: '600px', height: '500px' }}></div>;
    </div>
  );
}

export default MapPage;
