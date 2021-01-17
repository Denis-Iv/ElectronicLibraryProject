const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

const searchBooks = async searchText => {
    const res = await fetch('../Frontend/data/books.json');
    const books = await res.json();

    let matches = books.filter(book => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return book.title.match(regex) || book.author.match(regex);
    });

    if(searchText.length === 0) {
        matches = [];
    }

    console.log(matches);
};

search.addEventListener('input', () => searchBooks(search.value));