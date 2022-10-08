import mongoose from 'mongoose';
import * as db from './db.js';
import * as ratingModel from './ratingModel.js';

// bathroom schema
const bathroomSchema = mongoose.Schema({
    position: { lat: {type: Number, required: true}, lng: { type: Number, required: true }},
    rating: { type: Number, required: true },
    name: { type: String, required: true },
    tags: { type: Object, required: true }
});

// compile the model from the schema
const Bathroom = mongoose.model("Bathroom", bathroomSchema);

// get bathrooms, given a filter
const findBathrooms = async (filter) => {
    const query = Bathroom.find(filter);
    return query.exec();
}

// get bathroom by id
const findBathroomById = async (_id) => {
    const query = Bathroom.findById(_id);
    return query.exec();
}

// create a bathroom
const createBathroom = async (position, rating, name, tags) => {
    const bathroom = new Bathroom({
        position: position,
        rating: rating,
        name: name,
        tags: tags
    });
    return bathroom.save();
}

// update bathroom's aggregate rating
const updateAggregateRating = async (bathroomId) => {
    const bathroom = await findBathroomById(bathroomId)
    const ratingsFilter = { bathroomId: bathroomId }
    const ratings = await ratingModel.findRatings(ratingsFilter)
    let ratingSum = 0
    for (let i=0; i < ratings.length; i++){
        ratingSum += ratings[i].rating
    }
    const ratingCount = ratings.length
    let newRating = ratingSum / ratingCount
    bathroom.rating = newRating
    return bathroom.save();
}

// export for use in controller file
export { updateAggregateRating, createBathroom, findBathrooms, findBathroomById }