/*
    The purpose of this JavaScript file is to load the user input
    from local storage and display the information on the webpage.

    Author: 
            Aakarshan Khosla (A00474829)
*/

const data = JSON.parse(window.localStorage.getItem("burial-info"));

/**
 * A function to display the user data on the webpage
 * 
 * @param {data} the data that contains the burial information.
 */
function displayInfo(data){

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

/*
    Displaying data only if form has been submitted previously, in 
    other words, if local storage has user input.
*/
if (data !== null){
    displayInfo(data);
}
