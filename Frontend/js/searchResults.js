const search = document.getElementById('search');
const booksList = document.getElementById('books-list');
var currentCategory = document.getElementById('identifier').innerText;

search.addEventListener('input', () => searchBooks(search.value, categFilter, authorFilter));

const searchBooks = async (searchText, categFilter, authorFilter) => {
    // Чете книгите от файла
    const res = await fetch('../Frontend/data/books.json');
    const books = await res.json();

    // Изваждат се само книгите, които съвпадат с въведеното от потребителя и избраните филтри
    let matches = books.filter(book => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return  (book.author.match(regex) || book.title.match(regex)) && 
                (book.category == currentCategory) && 
                (book.genre == categFilter || categFilter == "") &&
                (book.author == authorFilter || authorFilter == "");
    });    

    //console.log(matches);

    // Ако няма намерени резултати се показва текст. Ако има резултати се вика функцията, която ги изобразява
    if (matches.length === 0) {       
        booksList.innerHTML = `<p class="no-books">Няма намерени резултати.</p>`;
    }
    else {
        displayBooks(matches);
    }    
};

const displayBooks = (books) => {
    const htmlString = books.map((book) => {        
        //console.log(book);
        return `  
        <div class="book-tile">     
            <a href="#${book.title}"><img src="${book.cover}" width="225px" height= "315px"></a>      
            <h1>${book.title}</h1>  
        </div>

        <div id="${book.title}" class="modalDialog">
            <div>
                <a href="#close" title="Затвори" class="close">X</a>
                <h1>${book.title}</h1>
                <h2>${book.author}</h2>
                <h4>Жанр: ${book.genre}</h4>

                <p>${book.description}</p>
                <a href="${book.booklink}">
                <button class="buttonRead">Прочети</button>
                </a>
            </div>
        </div>            
        `;
    }).join('');

    //console.log(htmlString);

    booksList.innerHTML = htmlString;    
};

searchBooks("","","");

let categFilter = "";
let authorFilter = "";

// Променя текущия филтър за жанр, когато потребителят избере нов
function setCategFilter(value) {     
    categFilter = value;
    searchBooks(search.value, categFilter, authorFilter);
}

// Променя текущия филтър за автор, когато потребителят избере нов
function setAuthorFilter(value) {
    authorFilter = value;
    searchBooks(search.value, categFilter, authorFilter);
}