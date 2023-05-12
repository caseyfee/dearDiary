import { openDB } from 'idb';


const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const postDb = async (content) => {
  console.log('Post to the db');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.add({ jate: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// Added logic to a method that accepts some content and adds it to the database
export const putDb = async (id, content) => {
  console.log('Update to the database');
  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readwrite');
  // Open up the desired object store.
  const store = tx.objectStore('jate');
  // Use the .put() method on the store and pass in the content.
  const request = store.put({ id: id, jate: content });
  // Get confirmation of the request.
  const result = await request;
  console.log('🚀 - data saved to the database', result);
  // console.error('putDb not implemented');

}



// Added logic for a method that gets all the content from the database
export const getDb = async () => {
  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB('jate', 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');
  // Open up the desired object store.
  const store = tx.objectStore('jate');
  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();
  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;
  // console.error('getDb not implemented');

}

initdb();
