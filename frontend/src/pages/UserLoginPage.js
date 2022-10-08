import React from 'react';

function NewUserLogin () {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submitUserLogin = async (e) => {
        const userCredentials = {
            username: username,
            password: password
        };
    

    console.log(userCredentials)

    const response = await fetch('/register', {
        method: 'POST',
        body: JSON.stringify(userCredentials),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.status === 201) {
        alert("Login successful!");
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