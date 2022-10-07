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