import React from 'react';
import { useEffect, useState } from 'react';
import RatingTable from '../components/RatingTable.js';

function UserProfilePage ({user, setUser}) {

  const [ratings, setRatings] = useState({});
  const [ratingToUpdate, setRatingToUpdate] = useState({});

  // checks local storage for a user and if found, sets user to the stored user
  useEffect(() => {
    console.log("Rendering UserProfilePage.");
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      loadRatings();
    }
  }, []);

  // Retrieve all ratings associated with the saved user
  const loadRatings = async () => {
    let url = new URL("https://localhost:3000");
    url.searchParams.append("username", user.username);

    console.log("Attempting to load ratings. URL:");
    console.log(user);
    console.log(url);

    const response = await fetch(url,{method: 'GET'});
    const ratings = await response.json();
    setRatings(ratings);
  }


    return (
        <RatingTable setRatingToUpdate={setRatingToUpdate}/>
    );
};

export default UserProfilePage;