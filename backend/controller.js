import express from 'express';
import * as bathroomModel from './model/bathroomModel.js';
import * as userModel from './model/userModel.js';
import * as ratingModel from './model/ratingModel.js';
import 'dotenv/config';
import cors from 'cors';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';

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
                    req.session.user_id, 
                    result._id, // bathroom id
                    req.body.rating)
                    .then(result =>  {
                        res.status(201).json(result);
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

    // check if the bathroom already exists
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
        // TODO: i had to put this bcrypt command inside of the .then to actually be able to send a response.
        // however this seems to have broken bcrypt
        // i cannot place an await statement in front
        // but it will accept any password as long as the username matches a db entry
        const validPassword = bcrypt.compare(password, user.password);
        if (validPassword) {
            console.log("login successful");
            console.log(user);
            req.session.user_id = user._id;
            res.status(201).json(user);
        } else {
            console.log("login failed");
            res.status(400).json(user);
        }
    })
    .catch( error => {
        console.log("login failed");
        res.status(400).json(userList[0])
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
// app.post('/rating/', async (req, res) => {
//     // check if user has already rated
//     const userId = req.params.user_id;
//     const user = await userModel.findUserById(user_id);
//     const filter = {ratings: {$in: {_id: userId}}}
// })

// THIS IS WHERE YOU ARE ^^^

// get all ratings by a given user
app.get('/rating/:user_id', async (req, res) => {
    const userId = req.params.user_id;
    const filter = {_id: userId}
    const ratings = await ratingModel.findRatings(filter);
    res.status(200).json(ratings);
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}.`)
})