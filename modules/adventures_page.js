import config from '../config/config.js';

let adventures = null;

let filters = getFiltersFromLocaleStorage() !== null ? getFiltersFromLocaleStorage() : {duration : "", category : []};

const duration = document.getElementById("select-duration");
const category = document.getElementById("select-category");
const clearDuration = document.getElementById("clear-duration");
const clearCategory = document.getElementById("clear-category");

duration.addEventListener('click', (event) => {
    const time = event.target.value;
    filters.duration = time;
});

category.addEventListener('click', (event) => {
    const c = event.target.value;
    if(c != ''){
        filters["category"].push(c);
    }
})

clearDuration.addEventListener("click", () => {
    duration.value = "";
    filters.duration = "";


})

async function init(){
    let city = await getCityFromURL(window.location.search);
    adventures = await fetchAdventures(city);
    let filteredAdventures = filterFunction(filters,adventures);
    addAdventureToDOM(adventures);
}
init();

function addAdventureToDOM(adventures){
    // console.log(adventures);

    const adventuresData = document.getElementById("adventures-data");
    adventuresData.className = "w-100 d-flex justify-content-center"

    const row = document.createElement("div");
    row.className = "w-100 d-flex flex-wrap justify-content-center gap-4 p-3";

    adventuresData.appendChild(row);

    adventures.forEach((Card) => {
        const anchor = document.createElement("a");
        anchor.href = "/pages/details/index.html";
        anchor.id = Card.id;

        const card = document.createElement("div");
        card.style.width = "100%";
        card.style.maxWidth = "300px";
        card.style.height = "380px";
        card.className = "card d-flex flex-column text-center";

        const img = document.createElement("img");
        img.src = Card.image;
        img.className = "card-img-top";
        img.style.height = "200px";
        img.style.objectFit = "cover";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body d-flex flex-column align-items-center justify-content-center";

        const price = document.createElement("div");
        price.className = "d-flex align-items-center justify-content-between";

        const h5 = document.createElement("h5");
        h5.textContent = `${Card.name}`;
        h5.className = "p-1";

        const h6 = document.createElement("h6");
        h6.textContent = `₹${Card.costPerHead}`;
        h6.className = "p-1";

        price.append(h5,h6);

        cardBody.appendChild(price);

        const time = document.createElement("div");
        time.className = "d-flex align-items-center justify-content-between";
        
        const p1 = document.createElement("p");
        p1.textContent = "Duration : ";
        p1.className = "p-1";
        
        const p2 = document.createElement("p");
        p2.textContent = `${Card.duration} hours`;
        p2.className = "p-1"

        time.append(p1,p2);

        anchor.appendChild(img);
        cardBody.append(price,time);
        card.append(anchor,cardBody);

        const col = document.createElement("div");
        col.className = "col-12 col-md-6 col-lg-3";
        col.appendChild(card);
        row.appendChild(col);
    })
}

function getFiltersFromLocaleStorage(){
    return null;
}

async function getCityFromURL(URL){
    let params = new URLSearchParams(URL);
    return params.get("cities");
}

async function fetchAdventures(city){
    try{
        let response = await fetch(`${config.backendpoint}/adventures/?city=${city}`);
        let data = await response.json();
        console.log(data);
        return data;
    }catch{
        return null;
    }
}

function filterByDuration(list,low,high){
    return list.filter((city) => {
        return city.duration >= low && city.duration <= high;
    })
}

function filterByCategory(list,f){
    return list.filter((city) => {
        return f.category.includes(city.category);
    })
}

function filterFunction(list,f){
    if(f.duration){
        const [low,high] = f.duration.split('-').map(Number);
        list = filterByDuration(list,low,high);
    }

    if(f.category && f.category.length > 0){
        list = filterByCategory(list,f);
    }

    return list;
}   