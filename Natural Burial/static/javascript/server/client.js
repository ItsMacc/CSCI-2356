/*  
    The purpose of this JavaScript file is to save the burial information
    entered by the user and put this data in a JSON object and store it
    on local storage.

    Author: Aakarshan Khosla (A00474829)
*/

const SERVER_URL = "http://localhost:3026";
let uploaded = false;

// The JSON data object
const burial_data = {
    general_info: {
        name: "Your Name",
        number: 1e10,
        email: "youremail@gmail.com",
        DOB: "2000-01-01",
        places: 1
    },
    burial_method: "Casket",
    marker_option: "Wooden Cross",
    grave_location: "Camp Hill",
    inscription: "Your favourite text here"
}


function post() {
    /*
        Save values of user input in burial_data and 
        store burial_data in local storage
    */
    saveBurialInformation(burial_data);
    storeData(burial_data);

    let obj = burial_data;
    $.post(SERVER_URL +"/burialInfoEndpoint", obj, successFn).fail(errorFn);
    uploaded = true;
}

/**
 * A function to populate the webpage with data from local storage
 */
function displayData(){
    $.get("/burialInfoEndpoint");
    let data = JSON.parse(window.localStorage.getItem("burial-info"));

    if(data === null && !uploaded) {
        data = burial_data;
    }

    //general info
    const name = document.getElementById("name");
    const phoneNum = document.getElementById("phoneNum");
    const email = document.getElementById("email");
    const DOB = document.getElementById("DOB");
    const places = document.getElementById("places");

    //other inputs
    const burial_method = document.querySelector(`input[value="${data.burial_method}"]`);
    const grave_location = document.querySelector(`input[value="${data.grave_location}"]`);
    const marker_option = document.querySelector(`input[value="${data.marker_option}"]`);
    const inscription = document.getElementById("inscription");

    //Displaying values on webpage
    name.value = data.general_info.name;
    phoneNum.value = data.general_info.number;
    email.value = data.general_info.email;
    DOB.value = data.general_info.DOB;
    places.value = data.general_info.places;
    burial_method.checked = true;
    grave_location.checked = true;
    marker_option.checked = true;
    inscription.value = data.inscription;

    window.scrollTo(0,0);
}

//------------------------------HELPER METHODS------------------------------

function successFn(returnedData) {
    console.log("success",returnedData);
}
  
function errorFn(err) {
    console.log(err.responseText);
}

/**
 * A function to save all burial information in a JSON object. This function
 * calls other functions to save their respective data.
 * 
 * @param {data} the JSON object that stores the information.
 */
function saveBurialInformation(data){
    saveGeneralInfo(data);
    saveBurialMethod(data);
    saveGraveLocation(data);
    saveMarkerOption(data);
    saveInscription(data);
}

/**
 * A function that stores general information in JSON object.
 * 
 * @param {data} the JSON object to store the general information. 
 */
function saveGeneralInfo(data){
    var general_info_input = document.querySelectorAll(".general-info input");

    data.general_info.name = general_info_input[0].value;
    data.general_info.number = general_info_input[1].value;
    data.general_info.email = general_info_input[2].value;
    data.general_info.DOB = general_info_input[3].value;
    data.general_info.places = general_info_input[4].value;
}

/**
 * A function that stores burial method in JSON object.
 * 
 * @param {data} the JSON object to store the burial method.
 */
function saveBurialMethod(data){
    var burial_methods = document.querySelector(".burial-methods");
    var burial_method = burial_methods.querySelector("input:checked").value;

    data.burial_method = burial_method;
}

/**
 * A function that stores grave location in JSON object.
 * 
 * @param {data} the JSON object to store the grave location.
 */
function saveGraveLocation(data){
    var grave_locations = document.querySelector(".grave-locations");
    var grave_location = grave_locations.querySelector("input:checked").value;

    data.grave_location = grave_location;
}

/**
 * A function that stores marker option in JSON object.
 * 
 * @param {data} the JSON object to store the marker option.
 */
function saveMarkerOption(data){
    var marker_options = document.querySelector(".marker-options");
    var marker_option = marker_options.querySelector("input:checked").value;

    data.marker_option = marker_option;
}

/**
 * A function that stores inscription in JSON object.
 * 
 * @param {data} the JSON object to store the inscription.
 */
function saveInscription(data){
    var text = document.querySelector("textarea").value;

    data.inscription = text;
}

/**
 * A function to store the data on local storage. Checks if local storage
 * is available, otherwise alerts the user.
 * 
 * @param {burial_data} the object to store on local storage.
 */
function storeData(burial_data){
    if (typeof Storage !== "undefined"){
        window.localStorage.setItem("burial-info", JSON.stringify(burial_data));
    }
    else{
        alert("Not enough local storage!");
    }
}