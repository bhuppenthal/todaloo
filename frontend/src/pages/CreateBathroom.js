import React from 'react';
import SubmitForm from '../components/SubmitForm';

function CreateBathroom ({bathroomLatLng}) {
    console.log(bathroomLatLng);
    return (
        <>
        <SubmitForm bathroomLatLng={bathroomLatLng} />
        </>
    );
};

export default CreateBathroom;