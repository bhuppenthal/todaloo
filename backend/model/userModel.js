import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import * as db from './db.js';

// user schema
const userSchema = mongoose.Schema({
    name: String,
    ratings: { type: [Object], default: [] },
    password: { type: String }, // TODO: implement password hashing
    deleted: { type: Boolean, default: false }
});

// compile the model from the schema
const User = mongoose.model("User", userSchema);

// get users, given a filter
const findUsers = async (filter) => {
    const query = User.find(filter);
    return query.exec();
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

const deleteUserById = async (_id) => {
    const result = await User.deleteOne({_id: _id});
    return result.deletedCount;
}

const deleteUserByProperty = async (filter) => {
    const result = await User.deleteMany(filter);
    return result.deletedCount;
}

// export for use in controller
export { createUser, findUsers, findUserById, deleteUserById, deleteUserByProperty }