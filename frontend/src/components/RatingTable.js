import React from 'react';
import { useEffect, useState } from 'react';

import RatingRow from './RatingRow';

const RatingTable = ({ratingsArray}) => {

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