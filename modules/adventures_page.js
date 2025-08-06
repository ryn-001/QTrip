import config from '../config/config.js'

const data = document.getElementsByClassName("row")[0];

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


async function init(){
    let city = await fetchAdventuresCity(window.location.search);
    let adventuresCityData = await fetchAdventuresData(city);
    console.log(adventuresCityData);
}
init();