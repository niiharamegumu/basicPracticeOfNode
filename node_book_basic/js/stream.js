const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer(function(req,res){
    let urlParts = url.parse(req.url);
    let path = __dirname + '/..' + urlParts.pathname;
    let stream = fs.createReadStream(path);

    stream.on('data', function(data){
        res.write(data);
    });
    stream.on('end',function(data){
        res.end();
    });
});

server.listen(1234);
console.log('server start');