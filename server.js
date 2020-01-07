// we now create an express server to host our web app
const express = require('express');
const http = require('http');

// create express app
let app = express();
// bind app to http mod
let server = http.createServer(app);
// create express middleware to access our webapp
app.use(express.static('./client'));

// link app to port
server.listen(3000,()=>{
	console.log("Successfully connected to port 3000!");
});