import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { createCard } from '../api/createCard';
import { TDeck } from '../api/getDecks';
import { getDeck } from '../api/getDeck';
import { deleteCard } from '../api/deleteCard';
import '../Deck.css';
import { Header } from './Header';

export default function Deck() {
    const [text, setText] = useState('');
    const { deckId } = useParams<{ deckId: string }>();
    const [deck, setDeck] = useState<TDeck | null>(null);
    const [cards, setCards] = useState<string[]>([]);

    async function handleCreateCard(e: React.FormEvent) {
        e.preventDefault();
        const {cards: serverCards} = await createCard(deckId!, text);
        setCards(serverCards);
        setText('');
    }

    async function handleDeleteCard(index: number) {
        if (!deckId) return;
        const response = await deleteCard(deckId, index);
        setCards(response.cards);
    }

    useEffect(() => {        
        async function fetchDeck() {
            if (!deckId) return;
            const newDeck = await getDeck(deckId);
            setDeck(newDeck);
            setCards(newDeck.cards);
        }
        fetchDeck();
    }, [deckId]);

    return (
        <>
            <div className="Deck">
                <Header />
                <h1>{deck?.title}</h1>
                <form className='createCardForm' onSubmit={handleCreateCard}>
                    <label htmlFor="card-text">Card Text</label>
                    <input id='card-text' type="text" value={text}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setText(e.target.value)
                        }}
                    />
                    <button>Create Card</button>
                </form>
                <ul className="cards">
                    {cards.map((card, index) => (
                        <li key={index}>
                            <button onClick={() => handleDeleteCard(index)}>x</button>
                            {card}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}