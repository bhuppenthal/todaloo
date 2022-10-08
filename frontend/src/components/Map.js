import React from 'react';
import { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { useNavigate } from "react-router-dom";

import { BiBody, BiHandicap, BiWater } from "react-icons/bi";
import { RiHome4Fill, RiHandCoinFill } from "react-icons/ri";

import StarRating from '../components/StarRating';

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

  // Fires when the Map component is clicked
  const mapClick = async (e) => {
    console.log("Registered a map click.");
    if (Object.keys(selectedBathroom).length === 0) {
      setBathroomLatLng({lat: e.latLng.lat(), lng: e.latLng.lng()});
      setShowButton(!showButton);
    } else {
      // selecting anywhere on the map deselects the bathroom
      setSelectedBathroom({});
    }
  }

  // Fires when the Button component is clicked
  const buttonClick = async (e) => {
    console.log("Registered a button click.")
    navigate("/create-bathroom");
  }

  // Fires when a Marker component is clicked
  const markerClick = async (e) => {
      console.log("Registered a marker click.");
      // destroy button for adding a new bathroom
      setShowButton(false);

      //iterate through bathrooms until finding the correct bathroom
      let latitude = e.latLng.lat();
      let longitude = e.latLng.lng();
      for(let i = 0; i < bathrooms.length; i++) {
        if (bathrooms[i].position.lat === latitude && bathrooms[i].position.lng === longitude){
          setSelectedBathroom(bathrooms[i]);
          break;
        }
      }
      console.log("Selected bathroom:");
      console.log(selectedBathroom);
    };

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
            <StarRating rating={selectedBathroom.rating}/>
            {(selectedBathroom.tags.accessible) &&
              <div>
                <BiHandicap/>
                <p style={{display: 'inline'}}>Accessible!</p>
              </div>
            }
            {(selectedBathroom.tags.free) &&
              <div>
                <RiHandCoinFill />
                <p style={{display: 'inline'}}>Free!</p>
              </div>
            }
            {(selectedBathroom.tags.genderNeutral) &&
              <div>
                <BiBody/>
                <p style={{display: 'inline'}}>Gender Neutral!</p>
              </div>
            }
            {(selectedBathroom.tags.changingStation) &&
              <div>
                <RiHome4Fill/>
                <p style={{display: 'inline'}}>Changing Station!</p>
              </div>
            }
            {(selectedBathroom.tags.shower) &&
              <div>
                <BiWater />
                <p style={{display: 'inline'}}>Shower!</p>
              </div>
            }
          </div>
        }
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
            onClick={mapClick}>
            
            {bathrooms.map((bathroom, i) => (
              <>
              <Marker position={{lat: bathroom.position.lat, lng: bathroom.position.lng}} onClick={markerClick} key={i}/>
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