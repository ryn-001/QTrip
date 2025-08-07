import config from '../config/config.js'

let adventures = null;

const data = document.getElementsByClassName("row")[0];
const durationClear = document.getElementsByClassName("duration-clear")[0];
const categoryClear = document.getElementsByClassName("category-clear")[0];

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
    adventures.forEach((data) => {
        const card = document.createElement("div");
        card.className = "card col-12 col-sm-2 col-md-4 col-lg-3";

    })
}


async function init(){
    let city = await fetchAdventuresCity(window.location.search);
    adventures = await fetchAdventuresData(city);
    console.log(adventures);
    addAdventureToDOM(adventures);
}
init();