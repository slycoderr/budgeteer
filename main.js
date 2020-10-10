var express = require("express");
var path = require("path");
var app = express();
var port = 6001;

app.get("/", (request, response, next) => {
    response.sendFile(path.join(__dirname + "/views/index.html"));
});

app.get("/data", (request, response, next) => {
    response.json(["placeholder"]);
});

app.listen(port, ()=>{
    console.log("Server running on port "+port);
    console.log("pid: "+process.pid);
});