const filtersList = document.getElementById('categories-list');

document.addEventListener("DOMContentLoaded", function() {
    fetchFilters();
  });

const fetchFilters = async () => {
    const res = await fetch('../Frontend/data/sample.json');
    const filters = await res.json();

    let matches = filters.filter(filter => {       
        return filter.description;
    }); 

    displayFilters(matches);
};

const displayFilters = (filters) => {
    const htmlString = filters.map((filter) => {
        return ` 
        <li>
            <p>${filter.description}</p>
        </li> 
        `;
    }).join();

    filtersList.innerHTML = htmlString;
}