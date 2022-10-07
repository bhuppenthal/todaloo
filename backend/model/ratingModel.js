import mongoose from 'mongoose';
import * as db from './db.js';

// rating schema
const ratingSchema = mongoose.Schema({
    user: { type: Object, required: true },
    bathroom: { type: Object, required: true },
    date: { type: Date, required: true },
    rating: { type: Number, required: true}
})

// compile the model from the schema
const Rating = mongoose.rating("Rating", ratingSchema);

// get ratings, given a filter
const findRatings = async (filter) => {
    const query = Rating.find(filter);
    return query.exec();
}

// get rating by id
const findRatingById = async (_id) => {
    const query = Rating.findById(_id);
    return query.exec();
}

createRating = async (user, bathroom, rating) => {
    const Rating = new Rating({
        user: user,
        bathroom: bathroom,
        date: new Date(),
        rating: rating
    })
    return rating.save();
}

// export for use in controller file
export { createRating, findRatings, findRatingById }