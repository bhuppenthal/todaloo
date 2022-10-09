import React from 'react';
import { useEffect, useState } from 'react';

const RatingRow = ({rate, ratingsToUpdate}) => {

  console.log("pls");
  const {bathroomId, date} = rate;

  useEffect(() =>{
    console.log("Triggered a render of RatingRow.");
  },[ratingsToUpdate])

    return (
        <>
        <tr>
            <td>{bathroomId}</td>
            <td>{date}</td>
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