import config from '../conf/index.js'

async function init(){
    const city = getCityFromURL(window.location.search);
    console.log(city);
}
init();

function getCityFromURL(URL){
    const params = new URLSearchParams(URL);
    return params.get("city");
}