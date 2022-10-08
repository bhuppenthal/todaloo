// importing dependencies
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

//importing pages
import MapView from './pages/MapView';
import CreateBathroom from './pages/CreateBathroom';
import NewUserPage from './pages/NewUserPage';

// importing components
import Header from "./components/Header.js";
import NavBar from "./components/NavBar.js";

// importing styles
import './App.css';

function App() {

  const [user, setUser] = useState({loggedIn: false});
  const [bathroomLatLng, setBathroomLatLng] = useState(null);


// navigation links in header, dependent on whether the user is logged in or not

  return (
    <>
    <Header/>
    <NavBar user={user} setUser={setUser}></NavBar>

    <Router>
      <Routes>

        <Route path="/" element={<MapView bathroomLatLng={bathroomLatLng} setBathroomLatLng={setBathroomLatLng}/>}></Route>
        <Route path="/create-bathroom" element={<CreateBathroom bathroomLatLng={bathroomLatLng}/>}></Route>
        <Route path="/register" element={<NewUserPage/>}></Route>
        <Route path="/login"></Route>

      </Routes>
    </Router>
    <footer>&copy; 2022 Joanna Getek, Brenda Huppenthal, Nathaniel Luginbill</footer>
  </>
  );
}

export default App;
