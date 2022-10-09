import React from 'react';
import { useEffect, useState } from 'react';

const RatingTable = () => {

    const [ratings, setRatings] = useState();
    const [user, setUser] = useState();

    const loadRatings = async () => {
        const ratings = localStorage.getItem("userData");
        console.log(ratings);
        console.log(`type of response ${typeof ratings}`);
        // console.log(Object.keys(ratings));
        // for (let i = 0; i , Object.keys(ratings); i++) {
        //     console.log(ratings.i);
        // }
        setRatings(ratings);
    }

    // i am trying to make a fetch request for a specific rating row
    // which

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