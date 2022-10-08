import React from 'react';

import Map from "../components/Map"


function MapView ({bathroomLatLng, setBathroomLatLng}) {

    // const [bathrooms, setBathrooms] = useState([]);

    // // Retrieve all the bathrooms in db
    // const loadBathrooms = async () => {
    //     console.log("Entered load bathrooms")
    //     const response = await fetch('http://localhost:3000/bathroom', { method: 'GET'});
    //     const bathrooms = await response.json();
    //     setBathrooms(bathrooms);
    //     console.log(bathrooms.map(bathroom => bathroom.position));
    // }

    // //Load the bathrooms, used when the component is first mounted
    // useEffect(() => {
    //     loadBathrooms();
    // }, []);


    return (
        <>
        <Map bathroomLatLng={bathroomLatLng} setBathroomLatLng={setBathroomLatLng}/>
        </>
    );
};

export default MapView;