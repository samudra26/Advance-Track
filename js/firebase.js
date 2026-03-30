import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyABOVyC5Uz3Q_85609kvfwdYgdZcSFHBwE",
  authDomain: "tes-hackaton.firebaseapp.com",
  databaseURL: "https://tes-hackaton-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tes-hackaton",
  storageBucket: "tes-hackaton.firebasestorage.app",
  messagingSenderId: "382466846609",
  appId: "1:382466846609:web:c13ac92dac7250bb243430"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export function sendLocation(userId, data) {
  push(ref(db, 'users/' + userId + '/history'), {
    ...data,
    timestamp: Date.now(),
    device: navigator.userAgent
  });
}
