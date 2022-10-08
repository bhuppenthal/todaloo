import React from 'react';
import { RiStarFill, RiStarLine } from "react-icons/ri";

const StarRating = ({rating}) => {
    console.log(rating);
    return (
        <div>
            {Array(rating).fill(0).map((_,i) => <RiStarFill key={i}/>)}
            {Array(5-rating).fill(0).map((_,i) => <RiStarLine key={i}/>)}
        </div>
    )
}

export default StarRating;