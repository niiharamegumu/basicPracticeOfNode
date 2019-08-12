const request = require('request');
const fs  = require('fs');
const path = require('path');
const EventEmitter  = require('events').EventEmitter;
const mkdirp = require('mkdirp');
const ParseUrl = require('./parseUrl.js');


function spider (url) {
    const parseUrl = new ParseUrl(url);
    const emitter = new EventEmitter();
    const fileName = parseUrl.urlToFileName();
    console.log(fileName);
    fs.exists(fileName, exists => {
        if (!exists) {
            console.log(`Downloading ${url}`);
            createSiteHtmlFile(url, fileName, emitter);
            return;
        }
        return emitter.emit('alreadyFile', fileName);
    });
    return emitter;
}

function createSiteHtmlFile (url, fileName, emitter) {
    request(url, (err, res, body) => {
        if (err) {
            return emitter.emit('requestError', err);
        }
        mkDirWrFile(fileName, body, emitter);
    });
}

function mkDirWrFile (fileName, siteHtml, emitter) {
    mkdirp(path.dirname('./html/' + fileName), err => {
        if (err) {
            return emitter.emit('mkdirError', err);
        }
        wrFile(fileName, siteHtml, emitter);
    });
}

function wrFile (fileName, siteHtml, emitter) {
    fs.writeFile('./html/' + fileName, siteHtml, err => {
        if (err) {
            return emitter.emit('wrFileError', err);
        }
        return emitter.emit('createFile', fileName);
    });
}


spider(process.argv[2])
.on('requestError', err => console.log(`request error : ${err}`))
.on('mkdirError', err => console.log(`mkdir error : ${err}`))
.on('wrFileError', err => console.log(`write file error : ${err}`))
.on('alreadyFile', fileName => console.log(`already file : ${fileName}`))
.on('createFile', fileName => console.log(`create file : ${fileName}`));
