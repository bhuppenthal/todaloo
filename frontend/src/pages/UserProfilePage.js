import React from 'react';
import { useEffect, useState } from 'react';
import RatingTable from '../components/RatingTable.js';

function UserProfilePage ({setUser}) {

  //const [ratingsToUpdate, setRatingsToUpdate] = useState({});

  // checks local storage for a user and if found, sets user to the stored user
  useEffect(() => {
    console.log("Rendering UserProfilePage.");
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      console.log("Inside of loggedInUser!")
      console.log(loggedInUser);
      const foundUser = JSON.parse(loggedInUser);
      console.log(foundUser);
      setUser(foundUser);
      // loadRatings()
      // .then(() => {
      //   setUser(foundUser);
      // })
    }
  }, []);

  // Retrieve all ratings associated with the saved user
  // const loadRatings = async () => {
  //   console.log("Inside of Load Ratings!");
  //   const ratings = localStorage.getItem("userRatings");
  //   console.log(`Ratings from local storage: ${ratings}`);

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
  //     const response = await fetch("http://localhost:3000/rating/" + ratingsIDArray[i], {method: 'GET'});
  //     const rating = await response.json();
  //     ratingsArray.push(rating);
  //     console.log(rating);
  //   }
  //   console.log(`Ratings array in UserProfilePage: ${ratingsArray}`);
  //   setRatingsToUpdate(ratingsArray);
  //   //return ratingsArray;
  // }

  return (
    <>
      {/* <RatingTable ratingsToUpdate={ratingsToUpdate}/> */}
      <RatingTable/>
    </>
  );
};

export default UserProfilePage;