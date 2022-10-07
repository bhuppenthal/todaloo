import React from 'react';
import { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker }from '@react-google-maps/api';
//import BathroomMarker from '../components/BathroomMarker';

function Map ({bathroomLatLng, setBathroomLatLng}) {

  const [bathrooms, setBathrooms] = useState([]);

  // Retrieve all the bathrooms in db
  const loadBathrooms = async () => {
      console.log("Entered load bathrooms")
      const response = await fetch('http://localhost:3000/bathroom', { method: 'GET'});
      const bathrooms = await response.json();
      setBathrooms(bathrooms);
      console.log(bathrooms.map(bathroom => bathroom.position));
  }

  const mapClick = async (e) => {
    console.log("Registered a click.");
    setBathroomLatLng({lat: e.latLng.lat(), lng: e.latLng.lng()});
    console.log(bathroomLatLng);
    // change history to /create-bathroom
  }

  //Load the bathrooms, used when the component is first mounted
  useEffect(() => {
      loadBathrooms();
      console.log(bathrooms);
  }, []);


  const containerStyle = {
      height: "100vh",
      width: "100vw"
    };
      
  const center = {
    lat: 44.5646,
    lng: -123.2620
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCSav7XYiFV_A__jXEwiNmcrryHmYS-VPY",
    
  })
    
  if (loadError) return "Error"; 
  if (!isLoaded) return "Loading...";

  console.log(`HI you are in map.js here are the BRs: ${bathrooms}`)
  return (
      <>
      <h2>Hello i am a map</h2>

        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onClick={mapClick}
        >
            {/* <BathroomMarker bathrooms={bathrooms}/> */}
            {bathrooms.map((bathroom) => (
            <>
            <Marker position = {{lat: bathroom.position.lat, lng: bathroom.position.lng}}/>
            </>
            ))};
        </GoogleMap>
        </>
    )
};

export default Map;