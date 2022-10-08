import React from 'react';

import Map from "../components/Map"


function MapView ({bathroomLatLng, setBathroomLatLng}) {
    return (
        <>
        <Map bathroomLatLng={bathroomLatLng} setBathroomLatLng={setBathroomLatLng}/>
        </>
    );
};

export default MapView;