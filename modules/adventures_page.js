import config from '../config/config.js'

let adventures = null;
let filters = getFiltersFromLocalStorage() !== null ? getFiltersFromLocalStorage() : {duration : "", category : []};

const row = document.getElementsByClassName("row")[0];
const durationClear = document.getElementsByClassName("duration-clear")[0];
const categoryClear = document.getElementsByClassName("category-clear")[0];
const durationSelect = document.getElementById("duration-filter-select");
const categorySelect = document.getElementById("category-filter-select");

durationClear.addEventListener("click", () => {
    durationSelect.value = "";
    filters.duration = "";

    const filteredAdventures = filterFunction(adventures,filters);
    addAdventureToDOM(filteredAdventures);
    saveFiltersToLocalStorage(filters);
});

categoryClear.addEventListener("click", () => {
    filters.category = [];
    categorySelect.selectedIndex = 0;
    const filteredAdventures = filterFunction(adventures,filters);
    addAdventureToDOM(filteredAdventures);
    saveFiltersToLocalStorage(filters);
})

function saveFiltersToLocalStorage(filter){
    localStorage.setItem("filters",JSON.stringify(filter));
    return;
}

function getFiltersFromLocalStorage(){
    const x = localStorage.getItem("filters");
    return x ? JSON.parse(x) : null;
}

durationSelect.addEventListener("change", (event) => {
    const time = event.target.value;
    filters.duration = time;

    const filter = filterFunction(adventures,filters);

    addAdventureToDOM(filter);

    saveFiltersToLocalStorage(filters);
});

categorySelect.addEventListener("change", (event) => {
    let category = event.target.value;

    if(!filters.category.includes(category)) filters.category.push(category);
    let filteredAdv = filterFunction(adventures,filters);

    addAdventureToDOM(filteredAdv);

    saveFiltersToLocalStorage(filters);
})

function filterFunction(list,filters){
    if(filters.category && filters.category.length > 0){
        list = filterByCategory(list,filters.category);
    }

    if(filters.duration){
        const [low,high] = filters.duration.split('-').map(Number);
        list = filterByDuration(list,low,high);
    }
    return list;
}

function filterByDuration(list,low,high){
    return list.filter((card) => {
        return card.duration >= low && card.duration <= high;
    })
}

function filterByCategory(list,categoryList){
    return list.filter((card) => {
        return categoryList.includes(card.category);
    })
}

async function fetchAdventuresCity(URL){
    let params = new URLSearchParams(URL);
    return params.get("cities");
}

async function fetchAdventuresData(city){
    try{
        const response = await fetch(`${config.backendpoint}/adventures/?city=${city}`);
        const data = await response.json();
        return data;
    }catch{
        return null;
    }
}

function addAdventureToDOM(adventures){
    row.innerHTML = "";

    adventures.forEach((data) => {
        const col = document.createElement("div");
        col.style.height = "20rem";
        col.className = "col-12 col-sm-6 col-md-4 col-lg-3";

        const card = document.createElement("div");
        card.className = "card p-0";
        card.setAttribute("id",data.id);
        
        const anchor = document.createElement("a");
        anchor.href = "../details/index.html";

        const img = document.createElement("img");
        img.className = "card-img-top";
        img.src = data.image;

        const h4 = document.createElement("h4");
        h4.textContent = data.name;

        const h6 = document.createElement("h6");
        h6.textContent = data.currency + ' ' + data.costPerHead;

        const info = document.createElement("div");
        info.style.padding = "1rem";
        info.append(h4,h6);

        anchor.appendChild(img);
        card.append(anchor,info);
        col.appendChild(card);

        row.appendChild(col);
    })
}


async function init(){
    let city = await fetchAdventuresCity(window.location.search);
    adventures = await fetchAdventuresData(city);
    
    if(filters.duration || (filters.category && filters.category.length > 0)){
        const filtered = filterFunction(adventures,filters)
        addAdventureToDOM(filtered);
    }else{
        addAdventureToDOM(adventures);
    }
}
init();