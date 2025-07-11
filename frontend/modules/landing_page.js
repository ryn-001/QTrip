import config from '../conf/index.js';

async function init(){
    const data = await fetchCities();

    data.forEach((city) => {
        addCities(city.id,city.city,city.description,city.image);
    });
}

async function fetchCities(){
    try{
        const response = await fetch(`${config.backendpoint}/cities`);
        const data = await response.json();
        console.log(data);
        return data;
    }catch{
        return null;
    }  
}

function addCities(id,name,description,image){
    const cities = document.getElementById("cities");
    
    const cityCard = document.createElement("div");
    cityCard.setAttribute('class','city-card');
    cityCard.id = id;
    
    const anchor = document.createElement('a');
    anchor.href = 'adventures.html';

    const img = document.createElement('img');
    if(id == 'singapore') img.src = 'https://media.istockphoto.com/id/150451379/photo/singapore-city-skyline-at-night.jpg?s=612x612&w=0&k=20&c=usTn9W-kDOlU2uaCrP7TQPMCp1O5tljUT1__BRg5VRg='
    else img.src = image;

    anchor.appendChild(img);
    cityCard.appendChild(anchor);

    const info = document.createElement("div");
    info.setAttribute('class','city-card-info');

    info.innerHTML = `<h2>${name}</h2>
                      <p>${description}</p>`;

    cityCard.appendChild(info);

    cities.append(cityCard);
}

init();