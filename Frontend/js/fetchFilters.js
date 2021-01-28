const categoriesList = document.getElementById('categories-list');
const authorsList = document.getElementById('authors-list');
var currentCategory = document.getElementById('identifier').innerText;


// Radio бутони, които изчистват зададения филтър съответно за жанр или автор
const nullCatFilter = `
                    <li class="filter">
                        <input class="filter-select" type="radio" name="radioCateg" value="" checked="true" onclick="setCategFilter(value)">
                        <label class="filter-label" for="radioCateg">Не филтрирай</label">
                    </li>    
                    `;

const nullAuthFilter = `
                    <li class="filter">
                        <input class="filter-select" type="radio" name="radioAuthor" value="" checked="true" onclick="setAuthorFilter(value)">
                        <label class="filter-label" for="radioAuthor">Не филтрирай</label">
                    </li>    
                    `;


const fetchCategories = async () => {
    // Чете се json файла с информацията за книгите
    const res = await fetch('../Frontend/data/books.json');
    const categories = await res.json();

    // Отделят се книгите само от конкретната категория (книги на български, на английски или чуждестранни)
    let matches = categories.filter(category => {         
            return (category.genre) && (category.category == currentCategory);  
    });     

    // Премахват се дублираните жанрове
    const seen = new Set();
    const uniqueMatches = matches.filter(e => {
        const duplicate = seen.has(e.genre);
        seen.add(e.genre);
        return !duplicate;
    });

    // Жанровете се сортират по азбучен ред
    uniqueMatches.sort((a, b) => a.genre.localeCompare(b.genre, 'bg', {ignorePuctuation: true}));

    // Вика се функцията, която генерира бутоните като html
    displayCategories(uniqueMatches);
};

const displayCategories = (categories) => {
    const htmlString = categories.map((category) => {       
        return `         
        <li class="filter">
            <input class="filter-select" type="radio" value="${category.genre}" name="radioCateg" onclick="setCategFilter(value)">
            <label class="filter-label" for="${category.genre}">${category.genre}</label">
        </li>    
        `;
    }).join('');

    categoriesList.innerHTML = nullCatFilter + htmlString;  
}

const fetchAuthors = async () => {
    const res = await fetch('../Frontend/data/books.json');
    const authors = await res.json();

    let matches = authors.filter(author => {         
            return author.author && (author.category == currentCategory);  
    }); 

    const seen = new Set();
    const uniqueMatches = matches.filter(e => {
        const duplicate = seen.has(e.author);
        seen.add(e.author);
        return !duplicate;
    });

    uniqueMatches.sort((a, b) => a.author.localeCompare(b.author, 'bg', {ignorePuctuation: true}));

    displayAuthors(uniqueMatches);
};

const displayAuthors = (authors) => {
    const htmlString = authors.map((author) => {       
        return `         
        <li class="filter">
            <input class="filter-select" type="radio" value="${author.author}" name="radioAuthor" onclick="setAuthorFilter(value)">
            <label class="filter-label" for="${author.author}">${author.author}</label>
        </li>    
        `;
    }).join('');
    
    authorsList.innerHTML = nullAuthFilter + htmlString;
}

fetchCategories();
fetchAuthors();
