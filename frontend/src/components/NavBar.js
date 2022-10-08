import React from 'react';

const NavBar = ({user, setUser}) => {
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
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </nav>
            }
        </div>
            
    )
}

export default NavBar;