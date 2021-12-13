import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, onChildAdded, onValue } from "firebase/database";

// const baseUrl = 'http://localhost:3000';


const firebaseConfig = {
  apiKey: "AIzaSyBqY5RA2DRo2XKICF2l1LIO-LR11WHkyMk",
  authDomain: "pwa-firebase-e79d5.firebaseapp.com",
  databaseURL: "https://pwa-firebase-e79d5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pwa-firebase-e79d5",
  storageBucket: "pwa-firebase-e79d5.appspot.com",
  messagingSenderId: "794282951883",
  appId: "1:794282951883:web:ba48ceab4c04a1d6f4474e",
  measurementId: "G-L2NS5ELJLH"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export function createTodo(todo = {}) {
  const messages = ref(database, '/messages');
  const newKey = push(messages).key;
  console.log(newKey);

  set(ref(database, `/messages/${newKey}`), todo);
}

export function getTodos() {
  const todos = [];
  const messages = ref(database, '/messages');

  return new Promise(resolve => {
    onValue(messages, (snapshots) => {
      console.log(snapshots);
      snapshots.forEach(snapshot => {
        const data = snapshot.val();
  
        todos.push({
          key: snapshot.key,
          data: snapshot.val()
        });
      });
    
      resolve(todos);
    });
  });
}