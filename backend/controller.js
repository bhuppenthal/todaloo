import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import mongoose from 'mongoose';

import * as bathroomModel from './model/bathroomModel.js';
import * as userModel from './model/userModel.js';
import * as ratingModel from './model/ratingModel.js';

// create express instance, set the listening port
const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());
// Sessions use cookie, so include the cookie parser middleware before the express session middleware
const COOKIE_SECRET = process.env.COOKIE_SECRET;
app.use(cookieParser(COOKIE_SECRET))

// session set up
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: COOKIE_SECRET,
    cookie: { maxAge: 3600000 } 
}))


//---------------BATHROOM---------------
// GET request to bathroom return every bathroom object
app.get('/bathroom/', (req, res) => {
    console.log('Received GET request for bathroom collection.');
    bathroomModel.findBathrooms({})
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        console.error(error);
        res.status(404).json({Error: 'GET request failed.'})
    })
});

// GET to bathroom/:_id returns bathroom object
app.get('/bathroom/:_id', (req, res) => {
    console.log('Received GET request by ID.');
    bathroomModel.findBathroomById({_id: req.body._id})
    .then(result => {
        if (result != null) {
            res.status(200).json(result);
        } else {
            res.status(400).json({Error: `Bathroom ID ${req.params._id} was not found.`});
        }
    })
    .catch(error => {
        console.error(error);
        res.status(404).json({Error: 'GET request failed.'})
    })
});

// GET by position object
app.get('/bathroom/position', (req, res) => {
    console.log('Received GET request by position.');
    res.set('Access-Control-Allow-Origin', 'https://localhost:3000');
    bathroomModel.findBathrooms({position: req.params.position})
    .then(result => {
        if (result != null) {
            res.status(200).json(result);
        } else {
            res.status(400).json({Error: `Bathroom with position ${req.params.position} was not found.`})
        }
    })
    .catch(error => {
        console.error(error);
        res.status(404).json({Error: 'GET request failed.'});
    })
});

// POST to create a new bathroom
app.post('/bathroom', (req, res) => {
    console.log('Received POST request to bathroom.');
    console.log(req.body);

    // check if the bathroom already exists
    bathroomModel.findBathrooms({position: req.body.position})
    .then(result => {
        if (result.length !== 0) {
            res.status(400).json({Error: 'Bathroom already exists.'});
        } else {       

            bathroomModel.createBathroom(
                req.body.position,
                req.body.rating,
                req.body.name,
                req.body.tags)
            .then(result => {
                ratingModel.createRating(
                    req.body.username, 
                    result._id, // bathroom id
                    req.body.rating)
                    .then(result =>  {
                        const ratingId = result._id
                        userModel.updateUserBathrooms(req.body.username, result.bathroomId)
                        .then(result => {                            
                            userModel.updateUserRatings(req.body.username, ratingId)
                            .then(result => {
                                res.status(201).json({result})
                            })                            
                        })
                        .catch(error=> {
                            console.error(error)
                            res.status(400).json({Error: 'Updating users bathrooms failed.'});
                        })  
                    })
                    .catch(error=> {
                        console.error(error)
                        res.status(400).json({Error: 'POST bathroom, then add rating failed.'});
                    })                
            })
            .catch(error => {
                console.error(error);
                res.status(400).json({Error: 'POST bathroom failed.'});
            })         
        }       
    })
});


// update bathroom


// USER ROUTES
// POST to create a new user
app.post('/register/', (req, res) => {
    console.log('Received POST request to register.');
    console.log(req.body);

    // check if the username already exists
    userModel.findUsers({name: req.body.username})
    .then(result => {
        console.log(result);
        if (result.length !== 0) {
            res.status(400).json({Error: 'Username already exists.'});
        } else {
            userModel.createUser(
                req.body.username,
                req.body.password
                )
            .then(result => {
                console.log(result)
                res.status(201).json(result);
            })
            .catch(error => {
                console.error(error);
                res.status(400).json({Error: 'POST user failed.'});
            })
        }
    })    
});

// user login
app.post('/login/', async (req, res) => {
    console.log('Received post request to /login');
    const { username, password } = req.body;
    console.log(username)
    const filter = {name: username}
    const userList = await userModel.findUsers(filter)
    .then( userList => {
        const user = userList[0];
        console.log(user)
        const validPassword = bcrypt.compare(password, user.password)
        .then( validPassword => {
            if (validPassword) {
                console.log("login successful");
                console.log(user);
                req.session.user_id = user._id;                
                res.status(201).json(user);
            } else {
                console.log("login failed");
                res.status(400).json(user);
            }
        });
    })
    .catch( error => {
        console.log("login failed");
        res.status(400).json({Error: 'POST login failed.'});
    });
})

// user log out
app.post('/logout', (req, res) => {
    req.session.user_id = null;
    // req.session.destroy() this useful if we need to get rid of multiple session variables
})

// delete user by id
app.delete('/user/:id', (req, res) => {
    userModel.deleteUserById(req.params.id)
        .then(deletedCount => {
            res.send({ deletedCount: deletedCount});
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request failed'});
        });
});

// RATING ROUTES

// create a new rating
app.post('/rating/', async (req, res) => {
    // check if user has already rated
    const username = req.body.username;
    const bathroomId = req.body.bathroom_id;
    const bathroom = bathroomModel.findBathroomById(bathroomId);
    let userRatings = await userModel.findUserRatings(username);
    // make userRatings just an array of the user's ratings, without their _id involved
    userRatings = userRatings.ratings;
    console.log("post request to new rating")
    // console.log(userRatings)
    let hasAlreadyRated = false;
    for (let i = 0; i < userRatings.length; i++) {
        const rating = await ratingModel.findRatingById(userRatings[i])        
        if(rating.bathroomId === bathroomId){
            hasAlreadyRated = true;
        }
    }
    if (!hasAlreadyRated) {
        ratingModel.createRating(
            username,
            mongoose.Types.ObjectId(bathroomId),
            req.body.rating
            )
            .then(result => {
                const ratingId = result._id;
                userModel.addRatingToUser(username, ratingId)
                .then(result => {
                    // update bathrooms aggregate rating
                    bathroomModel.updateAggregateRating(bathroomId)
                    .then( result => {
                        console.log(result)
                        res.status(201).json(result);
                    })
                    .catch(error => {
                        console.error(error)
                        res.status(400).json({Error: 'Failed to update bathroom\'s aggregate rating.'});
                    })                    
                })
                .catch(error => {
                    console.error(error)
                    res.status(400).json({Error: 'POST rating failed adding rating to user.'});
                })
            })
            .catch(error => {
                console.error(error)
                res.status(400).json({Error: 'POST rating failed.'});
            })
    } else {
        res.status(400).json({Error: 'User has already rated this bathroom.'});
    }
})


// get rating by id
app.get('/rating/:_id', async (req, res) => {
    const ratingId = req.params._id
    ratingModel.findRatingById(ratingId)
    .then(rating => {
        res.status(200).json(rating)
    })
    .catch(error => {
        console.error(error)
        res.status(400).json({Error: 'Failed to find rating by that id.'});
    })
})


// update given rating
app.put('/rating/', async (req, res) => {
    const ratingId = req.body.rating_id
    const newRating = req.body.new_rating
    ratingModel.updateRating(ratingId, newRating)
    .then(result => {
        bathroomModel.updateAggregateRating(result.bathroomId.toString())
        .then(result => {
            // console.log(result)
            res.status(201).json(result);
        })
        .catch(error => {
            console.error(error)
            res.status(400).json({Error: 'Failed to update bathroom\'s aggregate rating.'});
        })        
    })
    .catch(error => {
        console.error(error)
        res.status(400).json({Error: 'Failed to update rating.'});
    })
})

// get all ratings by a given username
app.get('/rating/:username', async (req, res) => {
    const userId = await userModel.findUsers({name: req.params.username});
    console.log(userId);
    const userRatings = await userModel.findUserRatings(userId);
    console.log(userRatings);
    res.status(200);
    res.header('Access-Control-Allow-Origin', 'https://localhost:3000');
    res.json(userRatings);
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}.`)
})