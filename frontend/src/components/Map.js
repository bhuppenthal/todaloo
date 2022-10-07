import React from 'react';
import { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow, Autocomplete } from '@react-google-maps/api';
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
    setShowButton(!showButton);
    console.log(showButton);
  }

  // Button on click should perform map on click events
  const buttonClick = async (e) => {
    console.log("Registered a button click.")
    navigate("/create-bathroom");
  }

  // Fires when the Marker component is clicked on
  const markerClick = async (e) => {
    console.log("Registered a marker click.")
    // for now, display information above the map
    //Event: MouseMapEvent
    // call controller with latlng data
    const url = new URL("https://localhost:3000/bathroom/position");
    const params = {lat: e.latLng.lat(), lng: e.latLng.lng()};
    url.search = new URLSearchParams(params).toString();

    console.log(url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Methods': 'GET'
      },
    });
    // display results
    console.log(response);

    // future improvement: need a state variable to toggle between showing an info window and 
    // a marker when the marker is clicked/info window is closed
    // When marker clicked, Render an infowindow
  }

  const windowClose = async (e) => {
    // toggle between marker open and information window open
    // When closed, render the marker again
  }

  //Load the bathrooms, used when the component is first mounted
  useEffect(() => {
    console.log("Loaded the page.");
    loadBathrooms();
    console.log(bathrooms);
    console.log(bathroomLatLng);
  }, []);


  const containerStyle = {
      height: "75vh",
      width: "75vw",
      margin: "auto"
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
        {showButton &&
          <div>
            <button onClick={buttonClick} className="button">Click to create the bathroom</button>
          </div>
        } 
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            onClick={mapClick}>
            
            {// for loop to create a new state variable and state function for each marker component
            // showMarker, setShowMarker = useState()
            bathrooms.map((bathroom) => (
              <>
              <Marker position={{lat: bathroom.position.lat, lng: bathroom.position.lng}} onClick={markerClick}/>
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