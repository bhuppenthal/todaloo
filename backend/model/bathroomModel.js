import mongoose from 'mongoose';
import * as db from './db.js';

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

// export for use in controller file
export { createBathroom, findBathrooms, findBathroomById }