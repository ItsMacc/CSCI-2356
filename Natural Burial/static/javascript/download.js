/*
    The purpose of this JavaScript file is to load the user input
    from local storage and display the information on the webpage.
    The user can also download the information they entered.
*/


/* 
    This code implements downloading the JSON file 
    containing user input.
*/
const data = JSON.parse(window.localStorage.getItem("burial-info"));

const blob = new Blob([JSON.stringify(data)], {type: "/application/json"});
const url = URL.createObjectURL(blob);

const link = document.createElement("a");
link.href = url;
link.download = "data.json";

const downloadBtn = document.getElementById("download");

downloadBtn.addEventListener("click", function(){
    link.click();
});


/**
 * A function to display the user data on the webpage
 * 
 * @param {data} the data that contains the burial information
 */
function displayInfo(data){

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const places = document.getElementById("places");
    const DOB = document.getElementById("DOB");
    const burial_method = document.getElementById("burial-method");
    const marker_option = document.getElementById("marker-option");
    const grave_location = document.getElementById("grave-location");
    const inscription = document.getElementById("inscription");

    name.innerText = data.general_info.name;
    email.innerText = data.general_info.email;
    places.innerText = data.general_info.places;
    DOB.innerText = data.general_info.DOB;
    burial_method.innerText = data.burial_method;
    marker_option.innerText = data.marker_option;
    grave_location.innerText = data.grave_location;
    inscription.innerText = data.inscription;

}

displayInfo(data);