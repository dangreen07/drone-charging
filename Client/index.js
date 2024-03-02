const http = require("http");
const fs = require("fs");

const hostname = "localhost";
const port = "8080";

// Create a http server
const server = http.createServer((req, res) => {
    let filePath = __dirname + "/public/index.html";

    console.log(req.url);

    switch(req.url) {
        case '/':
            filePath = __dirname + "/public/index.html";
            break;
        default:
            filePath = __dirname + "/public" + req.url;
            break;
    }

    fs.readFile(filePath, (err, data) => {
        res.statusCode = 200;
        res.setHeader("Content-Type","text/html");
        res.end(data, "utf-8");
    });
})

//Setup the server to listen on port 8080
server.listen(port, hostname, ()=> {
    console.log(`Server running at http://${hostname}:${port}`);
})