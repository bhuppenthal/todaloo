import React from 'react';
import { useState } from 'react';
import "./NewUser.css"

function NewUserRegister () {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submitNewUser = async (e) => {
        const newUser = {
            username: username,
            password: password
        };
    
        console.log("printing new user:");
        console.log(JSON.stringify(newUser));

        const response = await fetch('/register', {
            method: 'POST',
            body: JSON.stringify({username: newUser.username, password: newUser.password}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

    if (response.status === 201) {
        alert("Registration successful!");
    } else {
        alert(`Failed to register, status code = ${response.status}`)
    }
    };

    return (
        <div className="register-title"> 
         
         <form onSubmit={(e) => {e.preventDefault();}}>
            <label className='user-name'>Enter Username</label>
            <input required
                type="text"
                placeholder="username"
                value={username}
                id="username"
                onChange={(e) => setUsername(e.target.value)} 
            />
            <label className='pass-word'>Enter Password </label>
            <input required
                type="password"
                placeholder="password"
                value={password}
                id="password"
                onChange={(e) => setPassword(e.target.value)} 
            />
            <div className='buttonContainer'>
                <button
                    type="submit"
                    className="register-button"
                    onClick={submitNewUser}>
                    Register
                </button>
            </div>
            
         </form>
        </div>
    );
};

export default NewUserRegister;