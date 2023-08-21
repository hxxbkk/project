const openRequest = indexedDB.open('folderDB', 1);

openRequest.onupgradeneeded = function (event) {
  const db = event.target.result;
  const objectStore = db.createObjectStore('folders', {
    keyPath: 'id',
    autoIncrement: true,
  });
  objectStore.createIndex('name', 'name', { unique: false });
};

function addFolder(folderName) {
  return new Promise((resolve, reject) => {
    const transaction = openRequest.result.transaction(
      ['folders'],
      'readwrite'
    );
    const foldersObjectStore = transaction.objectStore('folders');

    const folderData = { name: folderName };

    const request = foldersObjectStore.add(folderData);
    request.onsuccess = function () {
      console.log('새 폴더가 성공적으로 추가되었습니다.');
      resolve(request.result); // 폴더 객체를 반환
    };
    request.onerror = function () {
      console.error('새 폴더를 추가하는 데 실패했습니다.');
      reject(request.error);
    };

    transaction.oncomplete = function () {
      console.log('Transaction 완료: 폴더 DB 읽기 및 쓰기.');
    };
  });
}

export { addFolder };
