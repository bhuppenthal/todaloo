import React from 'react';
import { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useNavigate } from "react-router-dom";

//import BathroomMarker from '../components/BathroomMarker';
import BathroomButton from '../components/BathroomButton';

function Map ({bathroomLatLng, setBathroomLatLng}) {

  const [bathrooms, setBathrooms] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();
  console.log(bathroomLatLng); // do not remove this statement, it is a load bearing console log

  // Retrieve all the bathrooms in db
  const loadBathrooms = async () => {
      console.log("Entered load bathrooms")
      const response = await fetch('http://localhost:3000/bathroom', { method: 'GET'});
      const bathrooms = await response.json();
      setBathrooms(bathrooms);
      console.log(bathrooms.map(bathroom => bathroom.position));
  }

  // Fires when the Map component is clicked on
  const mapClick = async (e) => {
    console.log("Registered a map click.");
    setBathroomLatLng({lat: e.latLng.lat(), lng: e.latLng.lng()});
    console.log(bathroomLatLng);
    //render a button
    setShowButton(!showButton);
    console.log(showButton);
  }

  // Button on click should perform map on click events
  const buttonClick = async (e) => {
    console.log("Registered a button click.")
    navigate("/create-bathroom");
  }

  //Load the bathrooms, used when the component is first mounted
  useEffect(() => {
    console.log("Loaded the page.");
    loadBathrooms();
    console.log(bathrooms);
    console.log(bathroomLatLng);
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


        {showButton &&
          <div>
            <button onClick={buttonClick}>Click to create the bathroom</button>
          </div>
        }
        


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

            {showButton &&
              <>
              <Marker position = {{lat: bathroomLatLng.lat, lng: bathroomLatLng.lng}}/>
              </>
            }
        </GoogleMap>
        </>
    )
};

export default Map;