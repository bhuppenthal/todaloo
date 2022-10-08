import React from 'react';
import { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow, Autocomplete } from '@react-google-maps/api';
import { useNavigate } from "react-router-dom";

//import BathroomMarker from '../components/BathroomMarker';
import BathroomButton from '../components/BathroomButton';

function Map ({bathroomLatLng, setBathroomLatLng}) {

  const [bathrooms, setBathrooms] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [selectedBathroom, setSelectedBathroom] = useState({});

  const navigate = useNavigate();
  console.log(bathroomLatLng); // do not remove this statement, it is a load bearing console log

  // Retrieve all the bathrooms in db
  const loadBathrooms = async () => {
      const response = await fetch('http://localhost:3000/bathroom', { method: 'GET'});
      const bathrooms = await response.json();
      setBathrooms(bathrooms);
  }

  // Fires when the Map component is clicked on
  const mapClick = async (e) => {
    console.log("Registered a map click.");
    if (Object.keys(selectedBathroom).length === 0) {
      setBathroomLatLng({lat: e.latLng.lat(), lng: e.latLng.lng()});
      setShowButton(!showButton);
    } else {
      // selecting anywhere on the map deselects the bathroom
      console.log("deselecting the bathroom:");
      setSelectedBathroom({});
      console.log(selectedBathroom);
      console.log(Object.keys(selectedBathroom).length);
    }
  }

  // Button on click should perform map on click events
  const buttonClick = async (e) => {
    console.log("Registered a button click.")
    navigate("/create-bathroom");
  }

  // Fires when the Marker component is clicked on
  const markerClick = async (e) => {
      console.log("Registered a marker click.")
      let latitude = e.latLng.lat();
      let longitude = e.latLng.lng();
      //iterate through bathrooms until finding the index that matches e.latLng.lng() etc
      for(let i = 0; i < bathrooms.length; i++) {
        if (bathrooms[i].position.lat == latitude && bathrooms[i].position.lng == longitude){
          setSelectedBathroom(bathrooms[i]);
          break;
        }
      }
      console.log("selectedBathroom and length:");
      console.log(selectedBathroom);
      console.log(Object.keys(selectedBathroom).length);
    };

  const windowClose = async (e) => {
    // change state variable for corresponding marker to true, corresponding info window to false
  }

  // Load the bathrooms, used when the component is first mounted
  useEffect(() => {
    console.log("Loaded the page.");
    loadBathrooms();
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

  console.log(bathrooms)
  return (
      <>
        {showButton &&
          <div>
            <button onClick={buttonClick} className="button">Click to create the bathroom</button>
          </div>
        }
        {(Object.keys(selectedBathroom).length !== 0) &&
          <div>
            <p>{selectedBathroom.name}</p>
            <p>{selectedBathroom.rating}</p>
            <p>{selectedBathroom.tags.accessible}</p>
            <p>{selectedBathroom.tags.free}</p>
            <p>{selectedBathroom.tags.genderNeutral}</p>
            <p>{selectedBathroom.tags.changingStation}</p>
            <p>{selectedBathroom.tags.showers}</p>
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