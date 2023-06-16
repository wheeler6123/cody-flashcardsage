import express, { Request, Response } from 'express';
import config from '../config/config';
import mongoose from 'mongoose';
import cors from 'cors';
import Deck from './models/Deck';
import { getDecksController } from './controllers/getDecksController';
import { createDeckController } from './controllers/createDeckController';
import { deleteDeckController } from './controllers/deleteDeckController';
import { createCardForDeckController } from './controllers/createCardForDeckController';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/decks', getDecksController);
app.post('/decks', createDeckController);
app.delete('/decks/:deckId', deleteDeckController);
app.post('/decks/:deckId/cards', createCardForDeckController);

const connectDB = async () => {
    const connection = await mongoose.connect(config.MONGO_URI)
    console.log(`MongoDB Connected: ${connection.connection.host}`)
}

connectDB();

app.listen(config.PORT);