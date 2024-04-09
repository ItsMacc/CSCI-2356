/*  
    The purpose of this JavaScript file is to save the burial information
    entered by the user and put this data in a JSON object and store it
    on local storage.

    Authors: 
            Aakarshan Khosla (A00474829)
            Aarav Sen Mehta (A00467075)
            Bhabin Chudal (A00464169)
            Sadikshya Oli (A00457938)
*/

const SERVER_URL = "https://ugdev.cs.smu.ca:3026";

// The JSON data object
let burial_data = {
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

/**
 * A function that will upload the data contained in local
 * storage to the server
 */
function post() {
    let data = JSON.parse(window.localStorage.getItem("burial-info"));

    // If there is something in local storage, set the value of 
    // burial_data to that value and use it instead.
    if(data !== null){
        burial_data = data;
    }

    // attempt to POST obj to endpoint 
    // if (the middleware for this endpoint ran without error)
    //   call successFn
    // else
    //   call errorFn
    let obj = burial_data;
    $.post(SERVER_URL + "/burialInfoEndpoint", obj, successFn).fail(errorFn);
}

// Add an event listener to the form submit event
document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("#burial-form").addEventListener("submit", function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();
    });
});

/**
 * A function that will download the data from the
 * server and store it into local storage. Then, it displays
 * the data in local storage and populates the webpage.
 */
function get(){
    // attempt to GET a JSON object from endpoint http://ugdev.cs.smu.ca:3026/myGet
    // if (the middleware for this endpoint ran without error)
    //   call successShow
    // else
    //   call errorFn
    $.get(SERVER_URL + "/burialInfoEndpoint", successShow).fail(errorFn);
    displayInfo();
}

//------------------------------HELPER METHODS------------------------------

/**
 * The purpose of this function is to log the JSON object received
 * from the server.
 * 
 * @param {returnedData} contains the JSON object returned by the server
 */
function successFn(returnedData) {
    console.log("success",returnedData);
}

/**
 * The purpose of this function is to log the error.
 * 
 * @param {err} the error object returned by the server
 */
function errorFn(err) {
    console.log(err.responseText);
}

/**
 * The purpose of this function is to store returned data locally
 * and populate the webpage with data from the local storage.
 * 
 * @param {returnedData} contains the JSON object returned by the server
 */
function successShow(returnedData) {
    storeData(returnedData);
    displayInfo();
}

/**
 * A function that when called, will save burial information to local
 * storage
 */
function saveData(){
    saveBurialInformation(burial_data);
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

    //Save data on local storage
    storeData(data); 
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

/**
 * A function to display the user data on the webpage
 * 
 * @param {data} the data that contains the burial information.
 */
function displayInfo(){
    let data = JSON.parse(window.localStorage.getItem("burial-info"));

    // If there is no data in local storage, use default information
    if(data === null) {
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
}