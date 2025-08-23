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

function addAdventureDetailsToDOM(adventure){
    const name = document.getElementById("adventure-name");
    const subtitle = document.getElementById("adventure-subtitle");
    const photoGallery = document.getElementById("photo-gallery");
    const adventureContent = document.getElementById("adventure-content")

    name.innerHTML = adventure.name;
    subtitle.innerHTML = adventure.subtitle;
    
    const carousel = document.createElement("div");
    carousel.className = "carousel slide";
    carousel.setAttribute("id","details-carousel")

    const carouselInner = document.createElement("div");
    carouselInner.className = "carousel-inner";

    adventure.images.forEach((img, idx) => {
        const carouselItem = document.createElement("div");
        
        if(idx == 0) carouselItem.className = "carousel-item active";
        else carouselItem.className = "carousel-item";

        const image = document.createElement("img");
        image.setAttribute("src",img);

        carouselItem.appendChild(image);
        carouselInner.appendChild(carouselItem);
    })

    const prevButton = document.createElement("button");
    prevButton.className = "carousel-control-prev";
    prevButton.setAttribute("type","button");
    prevButton.setAttribute("data-bs-target","#details-carousel");
    prevButton.setAttribute("data-bs-slide","prev");
    prevButton.innerHTML = `<span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>`

    const nextButton = document.createElement("button");
    nextButton.className = "carousel-control-next";
    nextButton.setAttribute("type","button");
    nextButton.setAttribute("data-bs-target","#details-carousel");
    nextButton.setAttribute("data-bs-slide","next");
    nextButton.innerHTML = `<span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>`

    carousel.append(carouselInner,prevButton,nextButton);
    
    photoGallery.appendChild(carousel);

    adventureContent.innerHTML = adventure.content;
}

async function init(){
    let adventureId = getAdventureFromURL(window.location.search);
    let adventureDetails = await fetchAdventureDetails(adventureId);
    console.log(adventureDetails);
    addAdventureDetailsToDOM(adventureDetails);
}
init();