# 🖥️ React로 구현한 Windows 

React.js를 기반으로 Windows 데스크톱의 핵심 UI와 인터랙션을 구현한 웹 애플리케이션입니다.

단순한 UI 클론을 넘어, **IndexedDB API**를 활용해 실제 폴더 생성/관리가 가능한 파일 시스템을 구현하고, **드래그 앤 드롭**, **창 크기 조절** 등 복잡한 인터랙션을 구현하는 것을 목표로 했습니다.

<br />

🔗 **프로젝트 배포 링크:** [https://hxxbkk.github.io/](https://hxxbkk.github.io/)

<br />

## 📸 실행 화면

<img src="https://github.com/hxxbkk/project/assets/106261455/56cac111-2f72-49a9-be68-0bce4cd7163f" width="800">

<br />

## 💻 사용 기술 스택

* **Core:** React.js, JavaScript (ES6+)
* **State Management:** React Hooks (`useState`, `useContext`, `useEffect`)
* **Async/DB:** **IndexedDB API** (로컬 폴더 시스템 구현)
* **External API:** **Kakao Maps API** (지도 앱 연동)
* **Styling:** CSS
* **Deployment:** GitHub Pages
* **DevOps:** `.env` (API 키 분리 및 관리)

<br />

## ✨ 핵심 기능 구현
* **🖥️ 데스크톱 UI & 기본 기능**
    * 바탕화면, 작업 표시줄(Taskbar), 실시간 시계(`useEffect` 활용) 구현.
    * `WindowsStart.js`: 시작 버튼 클릭 시 메뉴 토글.
    * `WindowSizer.js`: 마우스 드래그를 통해 앱 컴포넌트의 창 크기를 조절하는 기능 구현.

* **🖱️ 드래그 앤 드롭 (Drag & Drop)**
    * `onDragStart`, `onDragEnd`: 아이콘 드래그 시 데이터(type, src, name)를 설정하고 시각적 효과를 부여.
    * `folder.js`: 드래그된 아이콘을 폴더 위로 `onDragOver`시 테두리 효과, `onDrop`시 폴더에 아이콘을 추가하는 로직 처리.

* **📁 폴더 시스템 (IndexedDB 연동)**
    * `ContextMenu.js`: 마우스 우클릭 시 '폴더 생성' 메뉴가 포함된 컨텍스트 메뉴 출력. (외부 클릭 시 `onClose`로 메뉴 닫기)
    * `handleFolderCreate`: '폴더 생성' 클릭 시, **`IndexedDB.js`의 `addFolder` 함수를 호출**하여 브라우저 로컬 DB에 실제 폴더 데이터를 영구 저장.
    * IndexedDB에 저장된 폴더 목록을 불러와 바탕화면에 렌더링.

* **🚀 앱 실행 및 관리**
    * `AppLauncher.js`: 아이콘 클릭 시 `openApp` 함수를 호출하여 TodoList, 지도 등 앱 실행 및 전체 화면 관리. `closeApp`으로 앱 종료(Unmount).
    * `SearchBar.js`: 시작 메뉴 내 검색창 구현. `Enter` 키 입력 시(`handleKeyPress`) `launchAppByName` 함수를 호출하여 이름으로 앱 실행.

* **📝 탑재 애플리케이션**
    * **TodoList (`App1.js`):** 할 일 추가(`addTodo`), 수정(`updateTodo`), 삭제(`removeTodo`), 완료 토글(`toggleCheck`) 등 CRUD 기능 전체 구현.
    * **지도 (`MapPage.js`):** Kakao Maps API 스크립트를 동적으로 로드(`useEffect`)하여 지도 및 교통정보 레이어를 표시.

<br />

## 💡 트러블 슈팅 (Troubleshooting)

### 1. 웹 페이지 전체 종료 기능의 브라우저 보안 제약

* **시도:** `WindowsStart.js의 exitButton에 OS의 '종료' 기능처럼 window.close() 함수를 호출하는 기능을 구현하려 시도했습니다.
* **발견(배운 점):** 테스트 결과, 스크립트(`window.open` 등)로 직접 열지 않은 창은 **브라우저의 보안 정책상 `window.close()`로 닫을 수 없음**을 확인했습니다. (맨 처음 로드 시 드물게 동작하는 현상을 제외하고는 일관된 작동을 보장할 수 없었습니다.)
* **대안 구현:** '페이지 전체 종료'는 브라우저의 고유 권한임을 인지하고, 대신 '개별 앱 종료' 기능에 집중했습니다. WindowsStart.js의 toggleAppVisibility 함수를 closeApp prop으로 각 앱(App1, MapPage)에 전달하여, '닫기' 버튼 클릭 시 해당 앱의 상태를 false로 변경하고 컴포넌트를 Unmount 시키는 방식으로 구현했습니다.

<br />

---

### ⚙️ 실행 방법

```bash
# 필요한 패키지를 설치합니다.
npm install

# 개발 서버를 실행합니다.
npm run start

