const search = document.getElementById('search');
const booksList = document.getElementById('books-list');
var currentCategory = document.getElementById('identifier').innerText;


search.addEventListener('input', () => searchBooks(search.value));

const searchBooks = async (searchText, categFilter, authorFilter) => {
    const res = await fetch('../Frontend/data/sample.json');
    const books = await res.json();

    let matches = books.filter(book => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return  (book.description.match(regex) || book.imageurl.match(regex)) && 
                (book.category == currentCategory) && 
                (book.description == categFilter || categFilter == "") &&
                (book.description == authorFilter || authorFilter == "");
    });    

    //console.log(matches);

    if (matches.length === 0) {
        booksList.innerHTML = `<p class="no-books">No matches found.</p>`;
    }
    else {
        displayBooks(matches);
    }    
};

const displayBooks = (books) => {
    const htmlString = books.map((book) => {
        return `  
        <div class="book-tile">     
            <a href="#openModal"><img src="img/the-great-gatsby.jpg" width="225px" height= "315px"></a>      
            <h1>${book.description}</h1>  
        </div>

        <div id="openModal" class="modalDialog">
            <div>
                <a href="#close" title="Close" class="close">X</a>
                <h1>${book.description}</h1>
                <h2>F. Scott Fitzgerald</h2>
                <h4>Genre: Tragedy</h4>

                <p>The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan. The novel was inspired by a youthful romance Fitzgerald had with a socialite, and by parties he attended on Long Island's North Shore in 1922. Following a move to the French Riviera, he completed a rough draft in 1924. After submitting the draft to editor Maxwell Perkins, the editor persuaded Fitzgerald to revise the work over the following winter. Despite being happy with the content of the text after revision, Fitzgerald was ambivalent about the book's title and considered a variety of alternatives. The final title that he was documented to have desired was Under the Red, White, and Blue. Fitzgerald was, however, happy with painter Francis Cugat's final cover design.</p>
                <button class="buttonFavourites">Add to Favourites</button>
                <a href="books/English books/the-great-gatsby.pdf">
                <button class="buttonRead">Read</button>
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

function setCategFilter(value) {     
    categFilter = value;
    searchBooks("", categFilter, authorFilter);
}

function setAuthorFilter(value) {
    authorFilter = value;
    searchBooks(search.value, categFilter, authorFilter);
}