import React from 'react';
import { useEffect } from 'react';

function UserProfilePage ({user, setUser}) {

    // checks local storage for a user and if found, sets user to the stored user
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
        }
      }, []);

    console.log("Welcome to the user profile page.");
    console.log(user);

    return (
        <p>user profile</p>
    );
};

export default UserProfilePage;