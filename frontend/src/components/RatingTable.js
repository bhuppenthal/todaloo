import React from 'react';
import { useEffect, useState } from 'react';
import './RatingTable.css';

import RatingRow from './RatingRow';

const RatingTable = () => {

    const [ratingsToUpdate, setRatingsToUpdate] = useState({});
    // console.log(`Ratings inside RatingTable: ${ratingsToUpdate}`);
    // console.log(ratingsToUpdate);
    // let ratingsString = JSON.stringify(ratingsToUpdate[3]);
    // console.log(ratingsString);

    const loadRatings = async () => {
        console.log("Inside of Load Ratings in RatingTable!");
        const ratings = localStorage.getItem("userRatings");
        console.log(`Ratings from local storage: ${ratings}`);
    
        let ratingsIDArray = [];
        let arrayIDValue = "";
    
        for (let char of ratings) {
          if (char !== ",") {
            arrayIDValue = arrayIDValue + char;
          } else {
            ratingsIDArray.push(arrayIDValue);
            arrayIDValue = "";
          }
        }
        ratingsIDArray.push(arrayIDValue);
    
    
        // iterate through the ratings ID Array, making a fetch request for each ID and storing in a rating ID
        let ratingsArray = []
    
        for (let i = 0; i < ratingsIDArray.length; i++) {      
          const response = await fetch("http://localhost:3000/rating/" + ratingsIDArray[i], {method: 'GET'});
          const rating = await response.json();
          ratingsArray.push(rating);
          console.log(rating);
        }
        console.log(`Ratings array in UserProfilePage: ${ratingsArray}`);
        //setRatingsToUpdate(ratingsArray);
        return ratingsArray;
      }

    useEffect(() => {
        console.log("Rendering the RatingsTable.");
        loadRatings().then(result => {
            setRatingsToUpdate(result);
        })
        .catch(error => {
            console.log("error?");
        })
    }, []);
    

    return (
        <table id="table">
            <thead>
                <tr>
                    <th>Bathroom Name</th>
                    <th>Rating</th>
                </tr> 
            </thead>
            <tbody>
                {Array.isArray(ratingsToUpdate) &&
                ratingsToUpdate.map((rate) => <RatingRow rate={rate} ratingsToUpdate={ratingsToUpdate}/>)}
            </tbody>
        </table>
    )
}

export default RatingTable;