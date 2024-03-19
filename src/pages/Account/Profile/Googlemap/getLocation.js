import React from "react";
import axios from "axios";

import { useState, useEffect } from "react";
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
// const libraries = ["places"];

function Mymap() {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || "",
  });
  const [locationData, setLocationData] = useState(null);
  const [userLocation, setUserLocation] = useState({});
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    const location = await axios.get("https://ipapi.co/json");
    setUserLocation(location?.data);
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  const getDetailedLocation = async (lat, lng) => {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
    );
    try {
      const results = response.data;
      console.log("results", results);
      if (results[0]) {
        const detailedLocation = results[0].formatted_address;
        return detailedLocation;
      }
      return null;
    } catch (error) {
      console.log("error on get location", error);
    }
  };

  const getLocationDetails = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
      );

      console.log("response", response.data);

      if (response.data.status === "OK") {
        const addressComponents = response.data.results[0].address_components;

        // Extract location details
        let sector = "";
        let district = "";
        let village = "";
        let streetNumber = "";

        addressComponents.forEach((component) => {
          const types = component.types;
          if (types.includes("neighborhood")) {
            sector = component.long_name;
          } else if (types.includes("locality")) {
            district = component.long_name;
          } else if (types.includes("administrative_area_level_2")) {
            village = component.long_name;
          } else if (types.includes("street_number")) {
            streetNumber = component.long_name;
          }
        });

        // Return location details
        return {
          sector,
          district,
          village,
          streetNumber,
        };
      } else {
        console.error("Geocoding API request failed");
        return null;
      }
    } catch (error) {
      console.error("Error fetching location details:", error);
      return null;
    }
  };

  const handleMarkerClick = async (event) => {
    console.log("event", event);
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const data = { lat, lng };
    // Store location data in local storage
    localStorage.setItem("locationData", JSON.stringify(data));
    // Update state to trigger re-render
    setLocationData(data);
    getLocationDetails(data.lat, data.lng);
    setSelectedLocation(data);
    const detailedLocation = await getDetailedLocation(lat, lng);
  };

  return isLoaded ? (
    <>
      {userLocation.country_name}
      {userLocation.country_code}
      {userLocation.city}
      {userLocation.latitude}
      {userLocation.longitude}
      <GoogleMap
        center={
          userLocation
            ? { lat: userLocation.latitude, lng: userLocation.longitude }
            : center
        }
        defaultCenter={
          userLocation
            ? { lat: userLocation.latitude, lng: userLocation.longitude }
            : center
        }
        zoom={8}
        mapContainerStyle={{ width: "100%", height: "50vh" }}
        options={{
          zoomControl: true,
          streetViewControl: true,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {/* {locationData && (
          <Marker position={{ lat: locationData.lat, lng: locationData.lng }} />
        )} */}
        {userLocation ? (
          <Marker
            position={{
              lat: userLocation.latitude,
              lng: userLocation.longitude,
            }}
            onClick={handleMarkerClick}
          >
            {selectedLocation && (
              <InfoWindow
                position={{
                  lat: selectedLocation.lat,
                  lng: selectedLocation.lng,
                }}
                onCloseClick={() => {
                  setSelectedLocation(null);
                }}
              >
                <div>
                  <h2>Selected Location</h2>
                  <p>This is your selected location!</p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ) : (
          <Marker
            onClick={handleMarkerClick}
            position={{ lat: locationData.lat, lng: locationData.lng }}
          />
        )}
        {/* <Marker onClick={handleMarkerClick} position={center} /> */}
      </GoogleMap>

      <GoogleMap
        onLoad={(map) => {
          const bounds = new window.google.maps.LatLngBounds();
          map.fitBounds(bounds);
        }}
        onUnmount={(map) => {
          //   localStorage.setItem("map", JSON.stringify(map));
          console.log("map", map);
          // do your stuff before map is unmounted
        }}
      />
    </>
  ) : (
    <></>
  );
}
export default Mymap;

export const App = () => {
  // const variable array to save the users location
  const [userLocation, setUserLocation] = useState(null);

  // define the function that finds the users geolocation
  const getUserLocation = () => {
    // if geolocation is supported by the users browser
    if (navigator.geolocation) {
      // get the current users location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // save the geolocation coordinates in two variables
          const { latitude, longitude } = position.coords;
          // update the value of userlocation variable
          setUserLocation({ latitude, longitude });
          console.log("lotiti", latitude, longitude);
        },
        // if there was an error getting the users location
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }

    // if geolocation is not supported by the users browser
    else {
      console.error("Geolocation is not supported by this browser.");
    }
    console.log("location", userLocation);
  };

  // return an HTML page for the user to check their location
  return (
    <div>
      <h1>Geolocation App</h1>
      {/* create a button that is mapped to the function which retrieves the users location */}
      <button onClick={getUserLocation}>Get User Location</button>
      {/* if the user location variable has a value, print the users location */}
      {userLocation && (
        <div>
          <h2>User Location</h2>
          <p>Latitude: {userLocation.latitude}</p>
          <p>Longitude: {userLocation.longitude}</p>
        </div>
      )}
    </div>
  );
};
