import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
} from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '95%',
  height: '50vh',
};

const MyMap = ({ selectedLocation }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey:
      process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries,
  });
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div style={{ marginTop: '50px' }}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={selectedLocation}
        zoom={13}
        onLoad={onMapLoad}
      >
        <MarkerF
          position={selectedLocation}
          //   icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
        />
      </GoogleMap>
    </div>
  );
};

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement('script');
  script.type = 'text/javascript';

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (
        script.readyState === 'loaded' ||
        script.readyState === 'complete'
      ) {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document
    .getElementsByTagName('head')[0]
    .appendChild(script);
};

const SearchLocationInput = ({ setSelectedLocation }) => {
  const [query, setQuery] = useState('');
  const autoCompleteRef = useRef(null);

  const handleScriptLoad = (
    updateQuery,
    autoCompleteRef
  ) => {
    autoComplete =
      new window.google.maps.places.Autocomplete(
        autoCompleteRef.current,
        {
          // types: ["(cities)"],
          componentRestrictions: { country: 'RW' },
        }
      );

    autoComplete.addListener('place_changed', () => {
      handlePlaceSelect(updateQuery);
    });
  };

  const handlePlaceSelect = async (updateQuery) => {
    const addressObject = await autoComplete.getPlace();

    const query = addressObject.formatted_address;
    updateQuery(query);

    const latLng = {
      lat: addressObject?.geometry?.location?.lat(),
      lng: addressObject?.geometry?.location?.lng(),
    };
    setSelectedLocation(latLng);
  };

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  return (
    <div className=' w-[95%] flex-col !sm:flex h-10 '>
      <label className='text-lg'>Type Location </label>
      <input
        ref={autoCompleteRef}
        className='form-control w-[95%] sm:w-[60%] h-10 border-2 border-gray-300 rounded-md px-2 py-1 mt-2'
        onChange={(event) => setQuery(event.target.value)}
        placeholder='Search Places ...'
        value={query}
      />
    </div>
  );
};

const MyMapComponent = () => {
  const [currentLocation, setCurrentLocation] =
    useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    const getLocationDetails = async () => {
      const { lat, lng } = currentLocation;
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&libraries=places`
        );

        if (response.data.status === 'OK') {
          const addressComponents =
            response.data.results[0].address_components;
          const detailedLocation =
            response.data.results[0].formatted_address;

          // Extract location details
          let sector = '';
          let district = '';
          let village = '';
          let streetNumber = '';
          let route = '';

          //         places     ['route']0: "route"length: 1[[Prototype]]: Array(0)
          // bundle.js:29922 places     (3) ['political', 'sublocality', 'sublocality_level_1']
          let administrative_area_level_1 = '';
          let administrative_area_level_2 = '';
          let political = '';
          let country = '';
          let sublocality = '';
          let sublocality_level_1 = '';
          let types = '';
          let street_address = '';

          addressComponents.forEach((component) => {
            if (
              component.types.includes('street_address')
            ) {
              street_address =
                street_address + component.long_name;
            }

            types = component.types;
            if (types.includes('neighborhood')) {
              sector = component.long_name;
            } else if (types.includes('locality')) {
              district = component.long_name;
            } else if (
              types.includes('administrative_area_level_2')
            ) {
              village = component.long_name;
            } else if (types.includes('street_number')) {
              streetNumber = component.long_name;
            } else if (types.includes('route')) {
              route = component.long_name;
            } else if (
              types.includes('administrative_area_level_1')
            ) {
              // handle administrative_area_level_1
            } else if (types.includes('political')) {
              // handle political
            } else if (types.includes('country')) {
              // handle country
            } else if (types.includes('sublocality')) {
              // handle sublocality
            } else if (
              types.includes('sublocality_level_1')
            ) {
              // handle sublocality_level_1
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
          console.error('Geocoding API request failed');
          return null;
        }
      } catch (error) {
        console.error(
          'Error fetching location details:',
          error
        );
        return null;
      }
    };

    if (currentLocation) getLocationDetails();
  }, [currentLocation]);

  return (
    <div>
      <SearchLocationInput
        setSelectedLocation={setCurrentLocation}
      />
      <MyMap selectedLocation={currentLocation} />
    </div>
  );
};

export default MyMapComponent;
