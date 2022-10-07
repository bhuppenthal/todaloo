import express from 'express';
import * as model from './model.js';
import 'dotenv/config';
import * as bathrooms from './model'

// create express instance, set the listening port
const PORT = process.env.PORT;
const app = express();
app.use(express.json());

//---------------BATHROOM---------------
// GET request to bathroom return every bathroom object
app.get('/bathroom/', (req, res) => {
    console.log('Received GET request for bathroom collection.');
    model.findBathrooms({})
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
    db.findBathroomById(req.params._id)
    .then(result => {
        if (result != null) {
            res.status(200).json(result);
        } else {
            res.status(400).json({Error: `Exercise ID ${req.params._id} was not found.`});
        }
    })
    .catch(error => {
        console.error(error);
        res.status(404).json({Error: 'GET request failed.'})
    })
});

// GET by position object
app.get('/bathroom/:_object', (req, res) => {
    console.log('Received GET request by position.');
});

// POST to create a new bathroom
app.post('/bathroom/', (req, res) => {
    console.log('Received POST request to bathroom.');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}.`)
})