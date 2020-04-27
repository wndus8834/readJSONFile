const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');

var server = http.createServer(function (request, response) {
    var parsedUrl = url.parse(request.url);
    var parsedQuery = querystring.parse(parsedUrl.query, '&', '=');

    response.writeHead(200, {
        'Content-Type': 'text/html'
    });

    var jsonFilePath = '';
    switch (parsedQuery.download) {
        case "env":
            if (parsedQuery.hosNum)
                jsonFilePath = 'C:\\Server\\Log\\' + parsedQuery.hosNum + '\\EnvConfig.json';
            break;
        case "file":
            if (parsedQuery.processName)
                jsonFilePath = 'C:\\Server\\Env\\' + parsedQuery.processName + '\\FileInfo.json';
            break;
        case "news":
            jsonFilePath = 'C:\\Server\\News\\' + 'test.txt';
            break;
    }

    try {
        fs.statSync(jsonFilePath);
        const dataBuffer = fs.readFileSync(jsonFilePath);
        response.end(dataBuffer);
    } catch {
        response.end(null);
    }
});

server.listen(8080, function () {
    console.log('Server is running...');
});