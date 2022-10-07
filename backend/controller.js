import express from 'express';
import 'dotenv/config';
import * as bathrooms from './model'

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}.`)
})