import React from 'react';
import { useEffect, useState } from 'react';
import RatingTable from '../components/RatingTable.js';

function UserProfilePage ({setUser}) {

  const [ratings, setRatings] = useState({});
  const [ratingsToUpdate, setRatingsToUpdate] = useState({});


  // checks local storage for a user and if found, sets user to the stored user
  useEffect(() => {
    console.log("Rendering UserProfilePage.");
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      const ratings = loadRatings();
      setUser(foundUser);
      setRatings(ratings);
    }
  }, []);

  // Retrieve all ratings associated with the saved user
  const loadRatings = async () => {
    const ratings = localStorage.getItem("userRatings");

    let ratingsIDArray = [];
    let arrayIDValue = "";

    for (let char of ratings) {
      if (char !== ",") {
        arrayIDValue = arrayIDValue + char;
      } else {
        ratingsIDArray.push(arrayIDValue);
        arrayIDValue = "";
      }
    }
    ratingsIDArray.push(arrayIDValue);


    // iterate through the ratings ID Array, making a fetch request for each ID and storing in a rating ID
    let ratingsArray = []

    for (let i = 0; i < ratingsIDArray.length; i++) {

      const response = await fetch("http://localhost:3000/rating/" + ratingsIDArray[i], {method: 'GET'})
      .then(response => {
        const rating = response.json();
        ratingsArray.push(rating);
      })
      .catch( error => {
        alert("Some error occurred.");
      }
      )
    }
    console.log(ratingsArray);
    setRatingsToUpdate(ratingsArray)
    return ratingsArray;
  }

  console.log(`ratings to update: ${ratingsToUpdate}`)

  return (
    <>
      <RatingTable ratingsToUpdate={ratingsToUpdate}/>
    </>
  );
};

export default UserProfilePage;