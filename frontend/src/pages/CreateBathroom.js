import React from 'react';
import SubmitForm from '../components/SubmitForm';

function CreateBathroom ({bathroomLatLng}) {
    console.log(bathroomLatLng.position);
    return (
        <>
        <h1>CREATEBATHROOM WORKING!!!</h1>
        < SubmitForm bathroomLatLng={bathroomLatLng}/>
        </>
    );
};

export default CreateBathroom;