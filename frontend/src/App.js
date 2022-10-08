// importing dependencies
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

//importing pages
import MapView from './pages/MapView';
import CreateBathroom from './pages/CreateBathroom';

// importing styles
import './App.css';

//testing commit

function App() {

  const [bathroomLatLng, setBathroomLatLng] = useState(null);

  return (
    <>

    <header class="app-header">To Da Loo</header>

    <Router>
      <Routes>

        <Route path="/" element={<MapView bathroomLatLng={bathroomLatLng} setBathroomLatLng={setBathroomLatLng}/>}></Route>
        <Route path= "/create-bathroom" element={<CreateBathroom bathroomLatLng={bathroomLatLng}/>}></Route>

      </Routes>
    </Router>
    <footer>&copy; 2022 Joanna Getek, Brenda Huppenthal, Nathaniel Luginbill</footer>
  </>
  );
}

export default App;
