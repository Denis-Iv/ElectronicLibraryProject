const categoriesList = document.getElementById('categories-list');
const authorsList = document.getElementById('authors-list');

const nullCatFilter = `
                    <li class="filter">
                        <input class="filter-select" type="radio" name="category" value="none">
                        <label class="filter-label" for="none">Не филтрирай</label>
                    </li>    
                    `;

const nullAuthFilter = `
                    <li class="filter">
                        <input class="filter-select" type="radio" name="author" value="none">
                        <label class="filter-label" for="none">Не филтрирай</label>
                    </li>    
                    `;

document.addEventListener("DOMContentLoaded", function() {
    fetchCategories();
    fetchAuthors();
  });

const fetchCategories = async () => {
    const res = await fetch('../Frontend/data/sample.json');
    const categories = await res.json();

    let matches = categories.filter(category => {         
            return category.description;  
    }); 

    displayCategories(matches);
};

const displayCategories = (categories) => {
    const htmlString = categories.map((category) => {       
        return `         
        <li class="filter">
            <input class="filter-select" type="radio" name="category" value="${category.description}">
            <label class="filter-label" for="${category.description}">${category.description}</label>
        </li>    
        `;
    }).join('');

    categoriesList.innerHTML = nullCatFilter + htmlString;
}

const fetchAuthors = async () => {
    const res = await fetch('../Frontend/data/sample.json');
    const authors = await res.json();

    let matches = authors.filter(author => {         
            return author.description;  
    }); 

    displayAuthors(matches);
};

const displayAuthors = (authors) => {
    const htmlString = authors.map((author) => {       
        return `         
        <li class="filter">
            <input class="filter-select" type="radio" name="author" value="${author.description}">
            <label class="filter-label" for="${author.description}">${author.description}</label>
        </li>    
        `;
    }).join('');
    
    authorsList.innerHTML = nullAuthFilter + htmlString;
}