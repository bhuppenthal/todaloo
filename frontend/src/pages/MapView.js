import React from 'react';

import Map from "../components/Map"


function MapView ({bathroomLatLng, setBathroomLatLng, user, setUser}) {
    return (
        <>
        <Map bathroomLatLng={bathroomLatLng} 
             setBathroomLatLng={setBathroomLatLng}
             user={user}
             setUser={setUser}/>
        </>
    );
};

export default MapView;