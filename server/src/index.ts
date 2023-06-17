import express, { Request, Response } from 'express';
import config from '../config/config';
import mongoose from 'mongoose';
import cors from 'cors';
import Deck from './models/Deck';
import { getDecksController } from './controllers/getDecksController';
import { createDeckController } from './controllers/createDeckController';
import { deleteDeckController } from './controllers/deleteDeckController';
import { createCardForDeckController } from './controllers/createCardForDeckController';
import { getDeckController } from './controllers/getDeckController';
import { deleteCardOnDeckController } from './controllers/deleteCardOnDeckController';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/decks', getDecksController);
app.post('/decks', createDeckController);
app.delete('/decks/:deckId', deleteDeckController);
app.get('/decks/:deckId', getDeckController);
app.post('/decks/:deckId/cards', createCardForDeckController);
app.delete('/decks/:deckId/cards/:index', deleteCardOnDeckController)

const connectDB = async () => {
    const connection = await mongoose.connect(config.MONGO_URI)
    console.log(`MongoDB Connected: ${connection.connection.host}`)
}

connectDB();

app.listen(config.PORT);