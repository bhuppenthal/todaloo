// importing dependencies
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import MapView from './pages/MapView';
import CreateBathroom from './pages/CreateBathroom';

// importing styles
import './App.css';


function App() {

  const [latLngToAdd, setLatLngToAdd] = useState([]);

  return (
    <>

    <h1>To Da Loo</h1>

    <Router>
      <Routes>
      
        <Route path="/" element={<MapView setLatLngToAdd={setLatLngToAdd}/>}> 
        </Route>

        <Route path= "/create-bathroom" element={<CreateBathroom latLngToAdd={latLngToAdd}/>}>
        </Route>

      </Routes>
    </Router>

  </>
  );
}

export default App;
