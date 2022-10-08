import React from 'react';
import { useState, useEffect } from 'react';

function UserLogin ({user, setUser}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    console.log(user); // also load bearing.
    //TODO: why are the state variables not actually initializing properly
    // they seem to need to be referenced once before they can actually be changed?

    //checking if user is already logged in - should redirect to logout/profile or homepage maybe?
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
        }
      }, []);

    const submitUserLogin = async (e) => {
        const userCredentials = {
            username: username,
            password: password
        };
    
    console.log("user credentials: ");
    console.log(userCredentials);

    const response = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify(userCredentials),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.status === 201) {
        alert("Login successful!");
        setUser({username: username, loggedIn: true});
        console.log("User successfully signed in.");
        console.log(user);
        //TODO: this will change the user state variable, but when the user navigates to any other page, the variable is reset
        // but you should see that on login after its successful the navigation links do change
        // this stores the user info in local storage for each page to retrieve
        localStorage.setItem("user", JSON.stringify({username: username, loggedIn: true}));
    } else {
        alert(`Failed to login, status code = ${response.status}`)
    }
    };

    return (
        <div className="login-title"> 
         
         <form onSubmit={(e) => {e.preventDefault();}}>
            <label>Enter Username</label>
            <input required
                type="text"
                placeholder="username"
                value={username}
                id="username"
                onChange={(e) => setUsername(e.target.value)} 
            />
            <label>Enter Password </label>
            <input required
                type="text"
                placeholder="password"
                value={password}
                id="password"
                onChange={(e) => setPassword(e.target.value)} 
            />
            <button
                type="submit"
                className="button"
                onClick={submitUserLogin}>
                Login
            </button>
         </form>
        </div>
    );
};

export default UserLogin;