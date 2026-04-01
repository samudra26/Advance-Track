export function startTracking(callback) {
  navigator.geolocation.watchPosition(
    (pos) => {
      callback({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
        accuracy: pos.coords.accuracy
      });
    },
    (err) => console.error(err),
    { enableHighAccuracy: true }
  );
}