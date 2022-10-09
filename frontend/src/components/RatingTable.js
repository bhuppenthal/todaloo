import React from 'react';
import { useEffect, useState } from 'react';

import RatingRow from './RatingRow';

const RatingTable = ({ratingsToUpdate}) => {

    console.log(`ratingsarray from ratingtable ${ratingsToUpdate}`)
    console.log(ratingsToUpdate)
    let ratingsString = JSON.stringify(ratingsToUpdate[3])
    console.log(ratingsString)
    

    return (
        <table>
            <thead>
                <tr>
                    <th>Bathroom Name</th>
                    <th>Rating</th>
                </tr> 
            </thead>
            <tbody>
            </tbody>
        </table>
    )
}

export default RatingTable;