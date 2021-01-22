const categoriesList = document.getElementById('categories-list');
const authorsList = document.getElementById('authors-list');
var currentCategory = document.getElementById('identifier').innerText;

//console.log(currentCategory);

const nullCatFilter = `
                    <li class="filter">
                        <input class="filter-select" type="radio" name="radioCateg" value="" onclick="Filter(value)">
                        <label class="filter-label" for="radioCateg">Не филтрирай</label onclick="Filter(value)">
                    </li>    
                    `;

const nullAuthFilter = `
                    <li class="filter">
                        <input class="filter-select" type="radio" name="radioAuthor" value="" onclick="Filter(value)">
                        <label class="filter-label" for="radioAuthor">Не филтрирай</label onclick="Filter(value)">
                    </li>    
                    `;


    

const fetchCategories = async () => {
    const res = await fetch('../Frontend/data/sample.json');
    const categories = await res.json();

    let matches = categories.filter(category => {         
            return category.description && (category.category == currentCategory);  
    }); 

    displayCategories(matches);
};

const displayCategories = (categories) => {
    const htmlString = categories.map((category) => {       
        return `         
        <li class="filter">
            <input class="filter-select" type="radio" value="${category.description}" name="radioCateg" onclick="Filter(value)">
            <label class="filter-label" for="${category.description}">${category.description}</label onclick="Filter(value)">
        </li>    
        `;
    }).join('');

    categoriesList.innerHTML = nullCatFilter + htmlString;
}

const fetchAuthors = async () => {
    const res = await fetch('../Frontend/data/sample.json');
    const authors = await res.json();

    let matches = authors.filter(author => {         
            return author.description && (author.category == currentCategory);  
    }); 

    displayAuthors(matches);
};

const displayAuthors = (authors) => {
    const htmlString = authors.map((author) => {       
        return `         
        <li class="filter">
            <input class="filter-select" type="radio" value="${author.description}" name="radioAuthor" onclick="Filter()">
            <label class="filter-label" for="${author.description}">${author.description}</label>
        </li>    
        `;
    }).join('');
    
    authorsList.innerHTML = nullAuthFilter + htmlString;
}

fetchCategories();
    fetchAuthors();
