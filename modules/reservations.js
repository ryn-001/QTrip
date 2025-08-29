import config from "../config/config.js"

let reservations = [];

async function fetchReservations(){
    try{
        const response = await fetch(`${config.backendpoint}/reservations/`);
        const data = await response.json();
        return data;
    }catch(e){
        return null;
    }
}

function addReservationsToTable(reservations){
    const banner = document.getElementById("no-reservations-banner");
    const tableParent = document.getElementById("reservation-table-parent");

    if(!reservations || reservations.length === 0){
        banner.style.display = "block";
        tableParent.style.display = "none";
        return;
    }

    banner.style.display = "none";
    tableParent.style.display = "block";

    const table = document.getElementById("reservation-table");
    reservations.forEach((ele) => {
        const tr = document.createElement("tr");
        const formattedDate = new Date(ele.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
            timeZone: "Asia/Kolkata"
        });


        const datePart = new Date(ele.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
            timeZone: "Asia/Kolkata"
        });

        const timePart = new Date(ele.date).toLocaleTimeString("en-IN", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
            timeZone: "Asia/Kolkata"
        });

        const bookingTime = `${datePart}, ${timePart}`;

        tr.innerHTML = `
            <td>${ele.id}</td>
            <td>${ele.name}</td>
            <td>${ele.adventureName}</td>
            <td>${ele.person}</td>
            <td>${formattedDate}</td>
            <td>${ele.price}</td>
            <td>${bookingTime}</td>
            <td>
                <div class="reservation-visit-button" id=${ele.id}>
                <a href="../details/index.html?adventure=${ele.adventure}">
                    Visit Adventure
                </a>
                </div>
            </td>
        `
        table.appendChild(tr);
    })
}

async function init(params) {
    reservations = await fetchReservations();
    addReservationsToTable(reservations);
}
init();