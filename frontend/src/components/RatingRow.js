import React from 'react';
import { useEffect, useState } from 'react';
import './RatingRow.css';

const RatingRow = ({rate, ratingsToUpdate}) => {

  const {bathroomId, rating} = rate;

  useEffect(() =>{
    console.log("Triggered a render of RatingRow.");
  },[ratingsToUpdate])

    return (
        <>
        <tr>
            <td>{bathroomId}</td>
            <td>{rating}</td>
        </tr>
        {/* {ratings.map((rating, i) => (
            <>
            <tr>
                <td>name</td>
                <td>rating</td>
            </tr>
            </>
        ))} */}
        </>
    )
}

//{bathrooms.map((bathroom, i) => (
//     <>
//     <Marker 
//         position={{lat: bathroom.position.lat, lng: bathroom.position.lng}} 
//         onClick={markerClick} 
//         key={i}
//         icon= {{url: '/toliet-icon50.png'}}/>
//     </>
//   ))}

export default RatingRow;