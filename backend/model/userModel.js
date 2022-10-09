import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import * as db from './db.js';

// user schema
const userSchema = mongoose.Schema({
    name: { type: String },
    ratings: { type: [Object], default: [] },
    bathrooms: { type: [Object], default: []},
    password: { type: String, required: true }, 
    deleted: { type: Boolean, default: false }
});

// compile the model from the schema
const User = mongoose.model("User", userSchema);

// get users, given a filter
const findUsers = async (filter) => {
    const query = User.find(filter);
    return query.exec();
}

const findUserId = async(username) => {
    const query = User.findOne({name: username}, '_id');
    return query.exec()
}

const findUserRatings = async(username) => {
    const query = User.findOne({name: username}, 'ratings');    
    return query.exec() 
}

const addRatingToUser = async(username, ratingId) => {
    const userId = await User.findOne({name: username}, '_id');
    const user = await findUserById(userId);
    user.ratings.push(ratingId)
    return user.save()
}

// get user by Id
const findUserById = async (_id) => {
    const query = User.findById(_id);
    return query.exec();
}

// create a user
const createUser = async (name, password) => {
    // for bcrypt hashing
    const saltRounds = 10;
    let hashed = '';
    
    bcrypt.hash(password, saltRounds, function(err, hash) {
        hashed = hash

        const user = new User({
            name: name,
            password: hashed
        });
        return user.save();
    });    
}

const updateUserBathrooms = async (username, bathroomId) => {
    let user = await findUsers({name: username})
    user = user[0]
    user.bathrooms.push(bathroomId)
    return user.save()
}

const updateUserRatings = async (username, ratingId) => {
    let user = await findUsers({name: username})
    user = user[0]
    user.ratings.push(ratingId)
    return user.save()
}

const deleteUserById = async (_id) => {
    const result = await User.deleteOne({_id: _id});
    return result.deletedCount;
}

const deleteUserByProperty = async (filter) => {
    const result = await User.deleteMany(filter);
    return result.deletedCount;
}

// export for use in controller
export { findUserId, updateUserRatings, updateUserBathrooms, addRatingToUser, createUser, findUsers, findUserRatings, findUserById, deleteUserById, deleteUserByProperty }