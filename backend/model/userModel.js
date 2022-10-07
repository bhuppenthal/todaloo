import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import * as db from './db.js';

// user schema
const userSchema = mongoose.Schema({
    name: String,
    ratings: { type: [Object], default: [] },
    password: String, // TODO: implement password hashing
    deleted: { type: Boolean, default: false }
});

// compile the model from the schema
const User = mongoose.model("User", userSchema);

// get users, given a filter
const findUsers = async (filter) => {
    const query = User.find(filter);
    return query.exec();
}

// get user by Id (camelcase ID, not freudian concept)
const findUserById = async (_id) => {
    const query = Bathroom.findById(_id);
    return query.exec();
}

// create a user
const createUser = async (name, password) => {
    // for bcrypt hashing
    const saltRounds = 10;
    let hashed = '';

    bcrypt.hash(password, saltRounds).then( hash => {
        hashed = hash;
    });

    const user = new User({
        name: name,
        password: hashed
    });
    return user.save();
}

// export for use in controller
export { createUser, findUsers, findUserById }