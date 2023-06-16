export async function deleteDeck(deckId: string) {
    const response = await fetch(`http://localhost:3333/decks/${deckId}`, {
        method: 'DELETE',
    });
    return response.json();
}