import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;

// confirm that the database has connected
db.once("open", (err) => {
    if(err){
        res.status(500).json({ error: '500: Connection to server failed.'});
    } else {
        console.log("Bathroom Database... ONLINE");
    }    
});

// bathroom schema
const bathroomSchema = mongoose.Schema({
    position: { lat: {type: Number, required: true}, lng: { type: Number, required: true }},
    rating: { type: Number, required: true },
    name: { type: String },
    tags: { type: Object }
});

// compile the model from the schema
const Bathroom = mongoose.model("Bathroom", bathroomSchema);

// get bathrooms, given a filter
const findBathrooms = async (filter) => {
    const query = Bathroom.find(filter);
    return query.exec();``
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