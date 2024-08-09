import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
 apiKey: 'AIzaSyATfGybiAriXh0j4PGvb9HmWS8g039iqoM',
 authDomain: 'chat-b1844.firebaseapp.com',
 databaseURL: 'https://chat-b1844-default-rtdb.firebaseio.com',
 projectId: 'chat-b1844',
 storageBucket: 'chat-b1844.appspot.com',
 messagingSenderId: '722950934105',
 appId: '1:722950934105:web:cb67e1625c40d9c28a2b48',
 measurementId: 'G-RTRWXZC38N',
};

initializeApp(firebaseConfig);
const db = getDatabase();
export default db;
