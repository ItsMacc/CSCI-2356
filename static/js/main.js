/**
 * The purpose of this JavaScript file is to read the user input
 * and save the data for the session.
 */

document.getElementById("burial-form").addEventListener("submit", 
function (event) {
    event.preventDefault();

    const input_list = this.getElementsByTagName("input");
    const inputs = [];

    for (let i = 0; i < input_list.length; i++) {
        inputs.push(input_list[i].value);
        input_list[i].value = "";
    }

    console.log(inputs);
})