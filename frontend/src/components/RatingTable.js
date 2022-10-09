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

    // i am trying to make a fetch request for a specific rating row
    // 

    useEffect(() => {
        loadRatings();
      }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Bathroom Name</th>
                    <th>Rating</th>
                    <th>Tags</th>
                    <th>Update?</th>
                </tr> 
            </thead>
        </table>
    )
}

export default RatingTable;