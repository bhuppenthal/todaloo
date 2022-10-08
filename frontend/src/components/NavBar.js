import React from 'react';

const NavBar = ({user, setUser}) => {
    //TODO: sure seems like these links are just text, but i needed to get the user login
    // state fixed first so i didnt get around to fixing this, sorry :(
    return (
        <div>
            {(user.loggedIn === true) &&
                <nav>
                    <a href="/profile">Profile</a>
                    <a href="/logout">Logout</a>
                </nav>
            }
            {(user.loggedIn !== true) &&
                <nav>
                    <a to="/login">Login</a>
                    <a to="/register">Register</a>
                </nav>
            }
        </div>
            
    )
}

export default NavBar;