import React from 'react';
import { useState } from 'react';

import Map from "../components/Map"

function MapView ({setBathroomLatLng}) {

    const [bathrooms, setBathrooms] = useState([]);


    return (
        <>
        <h1>MAPVIEW WORKS</h1>
        <Map />
        </>
    );
};

export default MapView;