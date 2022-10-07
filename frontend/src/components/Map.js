import React from 'react';
import { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker }from '@react-google-maps/api';
//import BathroomMarker from '../components/BathroomMarker';

function Map () {

  const [bathrooms, setBathrooms] = useState([]);

  // Retrieve all the bathrooms in db
  const loadBathrooms = async () => {
      console.log("Entered load bathrooms")
      const response = await fetch('http://localhost:3000/bathroom', { method: 'GET'});
      const bathrooms = await response.json();
      setBathrooms(bathrooms);
      console.log(bathrooms.map(bathroom => bathroom.position));
  }

  //Load the bathrooms, used when the component is first mounted
  useEffect(() => {
      loadBathrooms();
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
        >
            {/* <BathroomMarker bathrooms={bathrooms}/> */}
            {/* {bathrooms.map((bathroom) => (
            <Marker 
                position = {{lat: bathroom.position.lat, lng: bathroom.position.lng}}/>
            ))}; */}
            <Marker position = {{lat: 44.567132, lng: -123.272541}} />
        </GoogleMap>
        </>
    )
};

export default Map;