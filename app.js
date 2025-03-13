
const express = require("express");
const http = require("http");
const fs = require("fs");
const app = express();
const PORT = 5000;
const tasks = require("./routes/routes.js");

// Front page
app.use('/', tasks);

app.listen(PORT, (request,response) => {
    console.log("Server is running on port 5000...");
});
