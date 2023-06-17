import { Request, Response } from 'express';
import Deck from '../models/Deck';

export async function deleteDeckController(req: Request, res: Response) {
    const deckId = req.params.deckId;
    const deletedDeck = await Deck.findByIdAndDelete(deckId);
    if (!deletedDeck) {
        res.status(404).json({ message: 'Deck not found' });
        return;
    }
    res.json(deletedDeck);
}