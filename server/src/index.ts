import express, { Request, Response } from 'express';
import config from '../config/config';
import mongoose from 'mongoose';
import Deck from './models/Deck';

const app = express();
app.use(express.json());

app.post('/decks', async (req:Request, res:Response) => {
    const newDeck = new Deck({
        title: req.body.title,
    });
    const createdDeck = await newDeck.save();
    res.json(createdDeck);
});

const connectDB = async () => {
    const connection = await mongoose.connect(config.MONGO_URI)
    console.log(`MongoDB Connected: ${connection.connection.host}`)
}

connectDB();

app.listen(config.PORT);