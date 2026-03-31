// IMPORT FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";

// CONFIG (SUDAH FIX REGION)
const firebaseConfig = {
  apiKey: "AIzaSyABOVyC5Uz3Q_85609kvfwdYgdZcSFHBwE",
  authDomain: "tes-hackaton.firebaseapp.com",
  databaseURL: "https://tes-hackaton-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tes-hackaton",
  storageBucket: "tes-hackaton.firebasestorage.app",
  messagingSenderId: "382466846609",
  appId: "1:382466846609:web:c13ac92dac7250bb243430"
};

// INIT FIREBASE
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// INIT MAP
const map = L.map('map').setView([-6.2, 106.8], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

// MARKER STORAGE
const markers = {};

// REALTIME LISTENER
onValue(ref(db, 'users'), snap => {

  const users = snap.val();

  console.log("🔥 DATA FIREBASE:", users);

  if (!users) return;

  let count = 0;

  for (let id in users) {

    const history = users[id].history;

    if (!history) continue;

    // AMBIL DATA TERAKHIR (FIX UTAMA)
    const keys = Object.keys(history);
    const lastKey = keys[keys.length - 1];
    const last = history[lastKey];

    if (!last || !last.lat || !last.lon) continue;

    const latLng = [last.lat, last.lon];

    // BUAT / UPDATE MARKER
    if (!markers[id]) {
      markers[id] = L.marker(latLng).addTo(map);
    } else {
      markers[id].setLatLng(latLng);
    }

    // UPDATE INFO PANEL
    document.getElementById("dLat").innerText = last.lat.toFixed(5);
    document.getElementById("dLon").innerText = last.lon.toFixed(5);

    // BONUS: AUTO ZOOM KE USER
    map.setView(latLng, 15);

    count++;
  }

  // UPDATE TOTAL USER
  document.getElementById("totalUser").innerText = count;

});      map.flyTo(latLng, 17);
      markers[id].openPopup();
    };

    list.appendChild(li);
  }

});    list.appendChild(li);
  }

});
