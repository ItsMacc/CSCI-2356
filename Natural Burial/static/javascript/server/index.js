/*
    The purpose of this file is to provide a means for the client to
    interact with the server via endpoints for POST and GET requests.

    Authors: 
            Aakarshan Khosla (A00474829) [group leader]
            Aarav Sen Mehta (A00467075)
            Bhabin Chudal (A00464169)
            Sadikshya Oli (A00457938)
*/

const express = require("express");
const path = require("path");

const app = express();
const port = 3026;

let __dirName = path.dirname(__filename);

//------------------------------MIDDLEWARES------------------------------

app.use(express.static(path.join(__dirName, "../../../templates")));
app.use("/static", express.static(path.join(__dirName, "../../../static")));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use((req, res, next) => {
    // Allow any origin
    res.header("Access-Control-Allow-Origin", "*");
    // Allow GET, POST requests
    res.header("Access-Control-Allow-Methods", "GET,POST");
    // Allow headers with Content-Type
    res.header("Access-Control-Allow-Headers", "Content-Type");
    // Call next middleware
    next();
});

//------------------------------ROUTES------------------------------

//The JSON data object
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

/*
    The purpose of this function is to respond to a GET request for homepage.
 */
app.get("/", (req, res) => {
    res.sendFile("index.html");
})

/*
    The purpose of this function is to respond to a GET request for 
    endpoint: burialInfoEndpoint
*/
app.get("/burialInfoEndpoint", (req, res) => {
    res.status(200).send(burial_data);
})

/*
    The purpose of this function is to respond to a POST request for
    endpoint: saveBurialInfo
*/
app.post("/saveBurialInfo", (req, res) => {
    res.status(200);
})

/*
    The purpose of this function is to respond to a POST request for
    endpoint: burialInfoEndpoint
*/
app.post("/burialInfoEndpoint", (req, res) => {
    burial_data = req.body;
    res.status(200).send(burial_data);
})


/*
    The purpose of this function is to produce a message on the Node.js console,
    indicating the server has begun to listen for clients on a port.
*/
app.listen(port, () => {
    console.log("server is listening on port " + port);
})