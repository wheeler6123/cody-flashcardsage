export async function createDeck(title: string) {
    const response = await fetch('http://localhost:3333/decks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title
        }),
    });
    return response.json();
}
