import { Request, Response } from 'express';
import Deck from '../models/Deck';

export async function deleteCardOnDeckController(req: Request, res: Response) {
    const deckId = req.params.deckId;
    const index = req.params.index;
    const deck = await Deck.findById(deckId);
    if (!deck) {
        res.status(404).json({ message: 'Deck not found' });
        return;
    }
    deck.cards.splice(parseInt(index), 1);
    await deck.save();
    res.json(deck);
}