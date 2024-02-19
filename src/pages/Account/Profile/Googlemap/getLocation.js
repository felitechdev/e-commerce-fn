import React from "react";
// import { useState } from "react";
// import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

// const containerStyle = {
//   width: "400px",
//   height: "400px",
// };

// const center = {
//   lat: -3.745,
//   lng: -38.523,
// };

// function Mymap() {
//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
//   });

//   const [map, setMap] = React.useState(null);

//   const onLoad = React.useCallback(function callback(map) {
//     // This is just an example of getting and using the map instance!!! don't just blindly copy!
//     const bounds = new window.google.maps.LatLngBounds(center);
//     map.fitBounds(bounds);

//     setMap(map);
//   }, []);

//   const onUnmount = React.useCallback(function callback(map) {
//     setMap(null);
//   }, []);

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={10}
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//     >
//       {/* Child components, such as markers, info windows, etc. */}
//       <></>
//     </GoogleMap>
//   ) : (
//     <></>
//   );
// }

// export default React.memo(Mymap);

import { useState } from "react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const center = {
  lat: -1.935114,
  lng: 30.082111,
};

function Mymap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || "",
  });

  const [locationData, setLocationData] = useState(null);

  const handleMarkerClick = (event) => {
    console.log("event", event);
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const data = { lat, lng };
    // Store location data in local storage
    localStorage.setItem("locationData", JSON.stringify(data));
    // Update state to trigger re-render
    setLocationData(data);
  };

  return isLoaded ? (
    <>
      <GoogleMap
        center={center}
        zoom={8}
        mapContainerStyle={{ width: "50%", height: "50vh" }}
        options={{
          zoomControl: true,
          streetViewControl: true,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {locationData && (
          <Marker position={{ lat: locationData.lat, lng: locationData.lng }} />
        )}
        <Marker onClick={handleMarkerClick} position={center} />
      </GoogleMap>

      {/* <GoogleMap
        onLoad={(map) => {
          const bounds = new window.google.maps.LatLngBounds();
          map.fitBounds(bounds);
        }}
        onUnmount={(map) => {
          //   localStorage.setItem("map", JSON.stringify(map));
          console.log("map", map);
          // do your stuff before map is unmounted
        }}
      /> */}
    </>
  ) : (
    <></>
  );
}
export default Mymap;
