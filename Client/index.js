const http = require("http");
const fs = require("fs");

const hostname = "localhost";
const port = "8080";


// Create a http server
const server = http.createServer((req, res) => {
    console.log(req.url);
    let filePath = __dirname + "/public" + req.url.split("?")[0];
    if(req.url == "/") {
        filePath = __dirname + "/public/index.html"
    }

    fs.readFile(filePath, (err, data) => {
        res.statusCode = 200;
        res.end(data, "utf-8");
    });
})

//Setup the server to listen on port 8080
server.listen(port, hostname, ()=> {
    console.log(`Server running at http://${hostname}:${port}`);
})