import React from 'react';
import { useEffect, useState } from 'react';

const RatingTable = () => {

    const [ratings, setRatings] = useState();
    const [user, setUser] = useState();

    const loadRatings = async () => {
        const ratings = localStorage.getItem("userData");
        console.log(ratings);
        setRatings(ratings);
      }

    useEffect(() => {
        loadRatings();
      }, []);

    return (
        <table>
            <th>Bathroom Name</th>
            <th>Rating</th>
            <th>Tags</th>
            <th>Update?</th>
            
        </table>
    )
}

export default RatingTable;