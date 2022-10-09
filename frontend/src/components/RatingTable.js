import React from 'react';
import { useEffect, useState } from 'react';

import RatingRow from './RatingRow';

const RatingTable = ({ratingsToUpdate}) => {

    console.log(`ratingsarray from ratingtable ${ratingsToUpdate}`)
    console.log(ratingsToUpdate)
    // let ratingsString = JSON.stringify(ratingsToUpdate[3])
    // console.log(ratingsString)
    console.log("but i changed");
    

    return (
        <table>
            <thead>
                <tr>
                    <th>Bathroom Name</th>
                    <th>Rating</th>
                </tr> 
            </thead>
            <tbody>
                {ratingsToUpdate.map((rate) => <RatingRow rate={rate}/>)}
            </tbody>
        </table>
    )
}

export default RatingTable;