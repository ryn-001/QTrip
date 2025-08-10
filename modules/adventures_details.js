import config from "../config/config.js"

function getAdventureFromURL(URL){
    const data = new URLSearchParams(URL);
    const id = data.get("adventure");
    return id; 
}

async function fetchAdventureDetails(id){
    try{
        const response = await fetch(`${config.backendpoint}/adventures/detail?adventure=${id}`);
        const data = await response.json();
        return data;
    }catch{
        return null;
    }
}

async function init(){
    let adventureId = getAdventureFromURL(window.location.search);
    let adventureDetails = await fetchAdventureDetails(adventureId);
}
init();