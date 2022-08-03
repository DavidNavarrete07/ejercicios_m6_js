const latitude = document.querySelector("#latitude-form");
const longitude = document.querySelector("#longitude-form");

navigator.geolocation.getCurrentPosition(position => {
    latitude.value = position.coords.latitude;
    longitude.value = position.coords.longitude;
});