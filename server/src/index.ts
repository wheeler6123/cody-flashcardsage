import express, { Request, Response } from 'express';
import config from '../config/config';
import mongoose from 'mongoose';
import cors from 'cors';
import Deck from './models/Deck';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/decks', async (req:Request, res:Response) => {
    let decks = await Deck.find();
    res.json(decks);
    console.log(decks);
});

app.post('/decks', async (req:Request, res:Response) => {
    const newDeck = new Deck({
        title: req.body.title,
    });
    const createdDeck = await newDeck.save();
    res.json(createdDeck);
});

app.delete('/decks/:deckId', async (req:Request, res:Response) => {
    const deckId = req.params.deckId;
    const deletedDeck = await Deck.findByIdAndRemove(deckId);
    res.json(deletedDeck);
});

const connectDB = async () => {
    const connection = await mongoose.connect(config.MONGO_URI)
    console.log(`MongoDB Connected: ${connection.connection.host}`)
}

connectDB();

app.listen(config.PORT);