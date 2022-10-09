import React from 'react';
import { useState, useEffect } from 'react';

function UserLogin ({user, setUser}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
        const data = await response.json();
        if (response.status === 201) {
            alert("Login successful!");
            setUser({username: username, loggedIn: true});
            console.log("User successfully signed in.");
            console.log(data);
            console.log("Body of response:");
            console.log(data);
            localStorage.setItem("user", JSON.stringify({username: username, loggedIn: true}));
            localStorage.setItem("userData", data);
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