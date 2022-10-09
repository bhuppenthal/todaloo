import React from 'react';
import { useEffect, useState } from 'react';

const RatingRow = ({rate}) => {

  console.log("pls");
  const {bathroomId, date} = rate;
  //   const [ratings, setRatings] = useState({});

  //   // Retrieve all ratings associated with the saved user
  // const loadRatings = async () => {
  //   const ratings = localStorage.getItem("userRatings");

  //   let ratingsIDArray = [];
  //   let arrayIDValue = "";

  //   for (let char of ratings) {
  //     if (char !== ",") {
  //       arrayIDValue = arrayIDValue + char;
  //     } else {
  //       ratingsIDArray.push(arrayIDValue);
  //       arrayIDValue = "";
  //     }
  //   }
  //   ratingsIDArray.push(arrayIDValue);

  //   // iterate through the ratings ID Array, making a fetch request for each ID and storing in a rating ID
  //   let ratingsArray = []

  //   for (let i = 0; i < ratingsIDArray.length; i++) {

  //     const response = await fetch("http://localhost:3000/rating/" + ratingsIDArray[i], {method: 'GET'})
  //     .then(response => {
  //       const rating = response.json();
  //       ratingsArray.push(rating);
  //     })
  //     .catch( error => {
  //       alert("Some error occurred.");
  //     }
  //     )
  //   }
  //   console.log(ratingsArray);
  //   setRatings(ratingsArray);
  // }

  //   useEffect(() =>{
  //       loadRatings();
  //   },[]);

  //   loadRatings();

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