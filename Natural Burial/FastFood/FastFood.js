/** 
 * FastFood Library - Custom CSS Framework
 *
 * This JavaScript file encompasses the functionality of the FastFood library,
 * a custom CSS framework designed for enhancing accessibility and user
 * experience, especially for our client.
 */


/** Functionality for custom dropdown */
document.addEventListener("DOMContentLoaded", function (){
    const toggleButton= document.getElementById("toggle-btn");
    const dropdownOptions = document.getElementById("dropdown-options");


    toggleButton.addEventListener("click", function() {
        if (dropdownOptions.style.display === "none" || dropdownOptions.style.display === "") {
            dropdownOptions.style.display = "block";
            dropdownOptions.scrollIntoView({"behavior":"smooth"})
          } else {
            dropdownOptions.style.display = "none";
          }
      });

      const options = dropdownOptions.getElementsByClassName("option");

      for(let i = 0; i < options.length; i++){
        options[i].addEventListener("click",function () {
            const data = options[i].innerHTML;
             toggleButton.innerHTML = data;
             dropdownOptions.style.display = "none";
        })
      }
})