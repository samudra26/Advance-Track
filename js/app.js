import { startTracking } from './location.js';
import { sendLocation } from './firebase.js';

const status = document.getElementById("status");
const sysStatus = document.getElementById("sysStatus");

const latEl = document.getElementById("lat");
const lonEl = document.getElementById("lon");
const accEl = document.getElementById("acc");

const userId = "user_" + Math.random().toString(36).substr(2,5);

// STEP
function updateStep(s) {
  ["step1","step2","step3"].forEach(id=>{
    document.getElementById(id).classList.remove("active","done");
  });

  if(s===1) step1.classList.add("active");
  if(s===2){ step1.classList.add("done"); step2.classList.add("active"); }
  if(s===3){ step1.classList.add("done"); step2.classList.add("done"); step3.classList.add("active"); }
}

// PIPELINE SIMULATION
function pipeline(){
  sysStatus.innerText="Validating...";
  setTimeout(()=>sysStatus.innerText="Processing...",300);
  setTimeout(()=>sysStatus.innerText="Stored",600);
}

// START SYSTEM
function startSystem(){
  updateStep(1);
  status.innerText="Meminta izin lokasi...";

  navigator.geolocation.getCurrentPosition(
    () => {
      updateStep(2);
      startTrackingFlow();
    },
    () => {
      status.innerText="Izin lokasi ditolak";
    }
  );
}

// TRACKING
function startTrackingFlow(){
  startTracking((data)=>{
    status.innerText="Lokasi terverifikasi";

    latEl.innerText=data.lat.toFixed(6);
    lonEl.innerText=data.lon.toFixed(6);
    accEl.innerText=Math.round(data.accuracy)+" m";

    pipeline();
    sendLocation(userId,data);

    setTimeout(()=>{
      updateStep(3);
      status.innerText="Selesai";
    },1200);
  });
}

window.onload = startSystem;