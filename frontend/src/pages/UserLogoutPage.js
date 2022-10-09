import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserLogout.css';

function UserLogoutPage ({user, setUser}) {

  const navigate = useNavigate();

    // checks local storage for a user and if found, sets user to the stored user 
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
        }
      }, []);

    console.log("Welcome to the user logout page.");
    console.log(user);

    const handleLogout = () => {
        setUser({loggedIn: false});
        // setUsername("");
        // setPassword("");
        localStorage.clear();
        console.log("USER HAS BEEN LOGGED OUT");
        navigate("/");
      };

    return (
        <>
        <div className="logoutContainer">
          {/* <p className="p">user logout</p> */}
          
          <button 
              type="submit" 
              className="logoutButton"
              onClick={handleLogout}>
              Log Out
            </button>
        </div>
        
          </>
    );
};

export default UserLogoutPage;