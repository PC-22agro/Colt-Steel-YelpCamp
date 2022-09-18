
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/light-v10', // style URL
  center: campground.geometry.coordinates,
  zoom: 8, // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

// Create a new marker, set the longitude and latitude, and add it to the map.
new mapboxgl.Marker()
  .setLngLat(campground.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 })
      .setHTML(
        `<h3>${campground.title}</h3><p>${campground.location}</p>`
      )
  )
  .addTo(map);