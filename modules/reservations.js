import config from "../config/config.js"

reservations = [];

async function fetchReservations(){
    try{
        const response = await fetch(`${config.backendpoint}/reservations/`);
        const data = await response.json();
        return data;
    }catch(e){
        return null;
    }
}

async function init(params) {
    reservations = await fetchReservations();
    addReservationsToTable(reservations);
}
init();