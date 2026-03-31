import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";

/* ✅ FIREBASE CONFIG (FIX REGION) */
const firebaseConfig = {
  apiKey: "AIzaSyABOVyC5Uz3Q_85609kvfwdYgdZcSFHBwE",
  authDomain: "tes-hackaton.firebaseapp.com",
  databaseURL: "https://tes-hackaton-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tes-hackaton",
  storageBucket: "tes-hackaton.appspot.com",
  messagingSenderId: "382466846609",
  appId: "1:382466846609:web:c13ac92dac7250bb243430"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

/* MAP */
const map = L.map('map').setView([-2.5, 118], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(map);

const markers = {};
const circles = {};

/* REALTIME */
onValue(ref(db, 'users'), snap => {

  const users = snap.val();
  const list = document.getElementById("userList");

  list.innerHTML = "";

  if (!users) {
    document.getElementById("totalUser").innerText = 0;
    return;
  }

  /* ✅ FIX TOTAL USER */
  const total = Object.keys(users).length;
  document.getElementById("totalUser").innerText = total + " active";

  for (let id in users) {

    if (!users[id].history) continue;

    const history = users[id].history;
    const keys = Object.keys(history);
    if (keys.length === 0) continue;

    const last = history[keys[keys.length - 1]];

    const lat = last.lat;
    const lon = last.lon;
    const acc = last.acc;
    const time = new Date(last.time).toLocaleString();

    const latLng = [lat, lon];

    /* MARKER */
    if (!markers[id]) {
      markers[id] = L.marker(latLng).addTo(map);
    } else {
      markers[id].setLatLng(latLng);
    }

    /* CIRCLE */
    if (!circles[id]) {
      circles[id] = L.circle(latLng, {
        radius: acc,
        color: 'blue',
        fillOpacity: 0.2
      }).addTo(map);
    } else {
      circles[id].setLatLng(latLng);
      circles[id].setRadius(acc);
    }

    /* POPUP */
    markers[id].bindPopup(`
      <b>${id}</b><br>
      Lat: ${lat}<br>
      Lon: ${lon}<br>
      Acc: ${acc} m<br>
      Time: ${time}
    `);

    /* SIDEBAR */
    let li = document.createElement("li");
    li.className = "card";

    li.innerHTML = `
      <b>${id}</b><br>
      📍 ${lat.toFixed(5)}, ${lon.toFixed(5)}<br>
      🎯 ${acc} m<br>
      🕒 ${time}
    `;

    /* 🔥 CLICK → FOCUS MAP */
    li.onclick = () => {
      map.flyTo(latLng, 17);
      markers[id].openPopup();
    };

    list.appendChild(li);
  }

});    list.appendChild(li);
  }

});
