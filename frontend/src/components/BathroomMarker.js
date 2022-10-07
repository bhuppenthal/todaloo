import React from 'react';
import { Marker }from '@react-google-maps/api';

function BathroomMarker (bathrooms) {
    console.log("IN BRMARKER")
    console.log(`HERE ARE BRS: ${bathrooms}`)
    return (
        // <>
        // <p>BR marker</p>
        // </>
        <>
        {bathrooms.map((bathroom) => (
            <>
            <Marker 
                position = {{lat: bathroom.position.lat, lng: bathroom.position.lng}}/>
            </>
        ))};
        </>
    );
};

export default BathroomMarker;