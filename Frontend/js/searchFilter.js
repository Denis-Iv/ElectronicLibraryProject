const search = document.getElementById('search');
var booksList = null;

search.addEventListener('input', () => searchBooks(search.value));

const searchBooks = async searchText => {
    const res = await fetch('../Frontend/data/sample.json');
    const books = await res.json();

    let matches = books.filter(book => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return book.description.match(regex) || book.imageurl.match(regex);
    });    

    console.log(matches);
    
    displayBooks(matches);
};

window.onload = function () {
    booksList = document.getElementById('books-list');    
};

const displayBooks = (books) => {
    const htmlString = books.map((book) => {
        return `
        <li class="book">
            <h2>${book.description}</h2>            
            <img src="${book.imageurl}"></img>
        </li> 
        `;
    }).join('');

    console.log(htmlString);

    booksList.innerHTML = htmlString;

    
};