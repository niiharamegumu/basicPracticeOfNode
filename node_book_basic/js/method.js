
const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

let indexPage = fs.readFileSync('../index.html', 'utf-8');

let server = http.createServer(function(req,res){
    if (req.method == 'GET') {
        let urlParts = url.parse(req.url, true);
        console.log(urlParts);
        console.log('---get---');
        console.log('nameは'+urlParts.query.name);
        console.log('ageは'+urlParts.query.age);
    }

    if (req.method == 'POST') {
        let body = '';
        req.on('data', function(data){
            body += data;
        });
        req.on('end',function(){
            let params = qs.parse(body);
            console.log(params);
            console.log('---post---');
            console.log('nameは'+params.name);
            console.log('ageは'+params.age);
        });
    }

    res.writeHead(200,{'content-type':'text/html'});
    res.write(indexPage);
    res.end();
})
server.listen(1234);
console.log('start server')