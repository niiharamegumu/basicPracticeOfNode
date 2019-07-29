const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

const tmp = fs.readFileSync('./temp.ejs', 'utf-8');

const server = http.createServer(function(req,res){
    let data = ejs.render(tmp, {
        title: 'EJS',
        content1: '<p>エスケープされない</p>',
        content2: '<p>エスケープされる</p>',
        arr: ['いちご', 'メロン','バナナ']
    });
    res.writeHead(200, {'content-type':'text/html'});
    res.write(data);
    res.end();
});

server.listen(1234);
console.log('start');