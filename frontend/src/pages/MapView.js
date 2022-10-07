import React from 'react';
import { useState, useEffect } from 'react';

import Map from "../components/Map"

function MapView ({setBathroomLatLng}) {

    const [bathrooms, setBathrooms] = useState([]);

    // Retrieve all the bathrooms in db
    const loadBathrooms = async () => {
        console.log("Entered load bathrooms")
        const response = await fetch('http://localhost:3000/bathroom', { method: 'GET'});
        const bathrooms = await response.json();
        setBathrooms(bathrooms);
    }

    //Load the bathrooms, used when the component is first mounted
    useEffect(() => {
        loadBathrooms();
    }, []);

    console.log(`Here are bathrooms positions from get req: ${bathrooms.position}`)

    return (
        <>
        <h1>MAPVIEW WORKS</h1>
        <Map />
        </>
    );
};

export default MapView;