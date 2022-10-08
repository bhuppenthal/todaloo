import React from 'react';
import { useState } from 'react';

function NewUserLogin ({user, setUser}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
        //TODO: Similarly to previous examples, when setUser is first called, it doesn't actually set loggedIn to true.
        // it will only set it to true on the second successful log in.
        console.log("User successfully signed in.");
        console.log(user);
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

export default NewUserLogin;