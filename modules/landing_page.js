import config from "../config/config.js"
const cities = document.getElementById('cities');

async function fetchCities(){
    try{
        let response = await fetch(`${config.backendpoint}/cities`);
        let json = await response.json();
        return json;
    }catch{
        return null;
    }
}

async function init(){
    let cities = await fetchCities();

    cities.forEach((city) => {
        addCityToDOM(city)
    })
}
init();

function addCityToDOM(curr_city){
    let col = document.createElement('div');
    col.className = "col-12 col-sm-6 col-lg-3 g-4";

    let card = document.createElement('div');
    card.id = curr_city.id;
    card.className = "city-card";

    let anchor = document.createElement('a');
    anchor.href = `/pages/adventures/index.html?cities=${curr_city.id}`;
    
    let image = document.createElement('img');
    image.src = curr_city.image;
    image.addEventListener('error', () => {
        image.src = '/images/image-not-found.jpg';
    })

    anchor.appendChild(image);

    let content = document.createElement('div');
    let heading = document.createElement('h4');
    heading.innerHTML = curr_city.city;
    let description = document.createElement('p');
    description.innerHTML = curr_city.description;
    content.append(heading,description);
    content.className = "content";

    card.append(anchor,content);

    col.appendChild(card);

    let row = cities.firstElementChild;
    row.appendChild(col);
}

