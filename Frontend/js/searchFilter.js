const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

const searchBooks = async searchText => {
    const res = await fetch('../Frontend/data/state_capitals.json');
    const books = await res.json();

    let matches = books.filter(book => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return book.name.match(regex) || book.abbr.match(regex);
    });    

    console.log(matches);
};

search.addEventListener('input', () => searchBooks(search.value));