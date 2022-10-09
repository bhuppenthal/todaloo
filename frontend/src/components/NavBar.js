import React from 'react';
import './NavBar.css'

const NavBar = ({user, setUser}) => {
    return (
        <div className='navBar'>
            {(user.loggedIn === true) &&
                <nav className='navbar'>
                    <a href="/">Home</a>
                    <a href="/profile">Profile</a>
                    <a href="/logout">Logout</a>
                </nav>
            }
            {(user.loggedIn !== true) &&
                <nav className='navbar'>
                    <a href="/">Home</a>
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </nav>
            }
        </div>            
    )
}

export default NavBar;