import React from 'react';

function NewUserRegister () {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submitNewUser = async (e) => {
        const newUser = {
            username: username,
            password: password
        };
    
        console.log(newUser)

        const response = await fetch('/register', {
            method: 'POST',
            body: JSON.stringify(newUser),
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
        <div className="register-title"> 
         
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
                onClick={submitNewUser}>
                Register
            </button>
         </form>
        </div>
    );
};

export default NewUserRegister;