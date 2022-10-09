import React from 'react';
import { useEffect, useState } from 'react';
import RatingTable from '../components/RatingTable.js';

function UserProfilePage ({setUser}) {

  const [ratings, setRatings] = useState({});
  //const [ratingToUpdate, setRatingToUpdate] = useState({});

  // checks local storage for a user and if found, sets user to the stored user
  useEffect(() => {
    console.log("Rendering UserProfilePage.");
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      loadRatings();
      setUser(foundUser);
    }
  }, []);

  // Retrieve all ratings associated with the saved user
  const loadRatings = async () => {
    const ratings = localStorage.getItem("userRatings");

    let ratingsArray = [];
    let arrayValue = "";

    for (let char of ratings) {
      if (char !== ",") {
        arrayValue = arrayValue + char;
      } else {
        ratingsArray.push(arrayValue);
        arrayValue = "";
      }
    }
    ratingsArray.push(arrayValue);
    setRatings(ratingsArray);
    console.log(ratingsArray);

    let url = new URL("http://localhost:3000/rating/?") + new URLSearchParams({_id: ratingsArray[0]});
    console.log(url);

    const response = await fetch("http://localhost:3000/rating/?" + new URLSearchParams({_id: ratingsArray[0]}), {method: 'GET'})
    .then(response => {
      const a_rating = response.json();
      console.log(a_rating);
    })
  }


    return (
        <RatingTable/>
    );
};

export default UserProfilePage;