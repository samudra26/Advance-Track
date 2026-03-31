import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyABOVyC5Uz3Q_85609kvfwdYgdZcSFHBwE",
  authDomain: "tes-hackaton.firebaseapp.com",
  databaseURL: "https://tes-hackaton-default-rtdb.firebaseio.com",
  projectId: "tes-hackaton",
  storageBucket: "tes-hackaton.firebasestorage.app",
  messagingSenderId: "382466846609",
  appId: "1:382466846609:web:c13ac92dac7250bb243430"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const map = L.map('map').setView([-6.2, 106.8], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const markers = {};

onValue(ref(db, 'users'), snap => {
  const users = snap.val();
  if (!users) return;
  
  let count = 0;
  
  for (let id in users) {
    const last = Object.values(users[id].history).pop();
    const latLng = [last.lat, last.lon];
    
    if (!markers[id]) {
      markers[id] = L.marker(latLng).addTo(map);
    } else {
      markers[id].setLatLng(latLng);
    }
    
    document.getElementById("dLat").innerText = last.lat.toFixed(5);
    document.getElementById("dLon").innerText = last.lon.toFixed(5);
    
    count++;
  }
  
  document.getElementById("totalUser").innerText = count;
});
