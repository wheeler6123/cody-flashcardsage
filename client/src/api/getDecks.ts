export type TDeck = {
    title: string;
    _id: string;
}

export async function getDecks(): Promise<TDeck[]> {
    const response = await fetch('http://localhost:3333/decks');
    return response.json();
}