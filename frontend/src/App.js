// importing dependencies
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

//importing pages
import MapView from './pages/MapView';
import CreateBathroom from './pages/CreateBathroom';

// importing styles
import './App.css';


function App() {

  const [bathroomLatLng, setBathroomLatLng] = useState([]);

  return (
    <>

    <h1>To Da Loo</h1>

    <Router>
      <Routes>
      
        <Route path="/" element={<MapView setBathroomLatLng={setBathroomLatLng}/>}> 
        </Route>

        <Route path= "/create-bathroom" element={<CreateBathroom bathroomLatLng={bathroomLatLng}/>}>
        </Route>

      </Routes>
    </Router>

  </>
  );
}

export default App;
