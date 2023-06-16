import { useEffect, useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom';
import { deleteDeck } from './api/deleteDeck';
import { getDecks, TDeck } from './api/getDecks';
import { createDeck } from './api/createDeck';

function App() {
  const [title, setTitle] = useState('');
  const [decks, setDecks] = useState<TDeck[]>([]);

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();    
    const newDeck = await createDeck(title);
    setDecks([...decks, newDeck]);
    setTitle('');
  }

  async function handleDeleteDeck(deckId: string) {
    await deleteDeck(deckId);
    setDecks(decks.filter((deck) => deck._id !== deckId));
  }

  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks();
      setDecks(newDecks)
    }
    fetchDecks();
  }, []);

  return (
    <>
      <div className="App">
          <form className='createDeckForm' onSubmit={handleCreateDeck}>
            <label htmlFor="deck-title">Deck Title</label>
            <input id='deck-title' type="text" value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTitle(e.target.value)
              }}
            />
            <button>Create Deck</button>
          </form>
          <ul className="decks">
              {decks.map((deck) => (
                <li key={deck._id}>
                  <button onClick={() => handleDeleteDeck(deck._id)}>x</button>
                  <Link to={`/decks/${deck._id}`}>{deck.title}</Link>
                </li>
              ))}
          </ul>
      </div>
    </>
  )
}

export default App
