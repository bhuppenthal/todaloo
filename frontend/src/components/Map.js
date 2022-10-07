import React from 'react';
import { GoogleMap, useLoadScript }from '@react-google-maps/api';


function Map () {

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

    return (
        <>
        <h2>Hello i am a map</h2>

        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}>
        </GoogleMap>
        </>
    )
};

export default Map;