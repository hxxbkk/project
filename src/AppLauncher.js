import React from 'react';
import { createRoot } from 'react-dom/client';
import App1 from '../src/App1';
import mapPage from '../src/pages/mapPage';
import App from '../src/App';

const apps = [
  {
    name: 'TodoList',
    component: App1,
  },
  {
    name: '지도',
    component: mapPage,
  },
];

const rootElement = document.getElementById('root');

let root = rootElement._reactRoot;

if (!root) {
  root = createRoot(rootElement);
  rootElement._reactRoot = root;
}


export function launchAppByName(appName) {
  if (typeof appName !== 'string') {
    appName = '';
  }

  const matchingApp = apps.find(
    (app) => app.name.toLowerCase() === appName.toLowerCase()
  );

  if (matchingApp) {
    launchApp(matchingApp.component, closeApp);
  } else if (appName === '') {
    closeApp();
  } else {
    alert('찾을 수 없어요.');
  }
}

function closeApp() {
  renderApp(App);
}

function launchApp(AppComponent, closeApp) {
  renderApp(AppComponent, closeApp);
}

function renderApp(AppComponent, closeApp) {
  root.render(

      <AppComponent closeApp={closeApp} />
  
  );
}
