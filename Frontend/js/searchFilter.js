const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

search.addEventListener('input', () => searchBooks(search.value));

const searchBooks = async searchText => {
    const res = await fetch('../Frontend/data/state_capitals.json');
    const books = await res.json();

    let matches = books.filter(book => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return book.name.match(regex) || book.abbr.match(regex);
    });    

    console.log(matches);

    displayBooks(matches);
};

const displayBooks = (books) => {
    const htmlString = books.map((book) => {
        return `<p>book.name</p> `;
    }).join('');
    console.log(htmlString);

    booksList.innerHTML = htmlString;

    
};