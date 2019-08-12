"use strict";

const urlParse = require('url').parse;
const slug = require('slug');
const path = require('path');

class ParseUrl {
    constructor(url){
        this.parsedUrl = urlParse(url,true);
    }

    urlToFileName(){
        const urlPath = this.createPath(this.parsedUrl);
        let fileName = this.createFileName(this.parsedUrl, urlPath);
        return fileName;
    }

    createPath(url) {
        const path = url.path.split('/')
            .filter(function(component) {
                return component !== '';
            })
            .map(function(component) {
                return slug(component, { remove: null });
            })
            .join('/');
        return path;
    }

    createFileName(url, existPath){
        let fileName = path.join(url.hostname,existPath);
        if(!path.extname(fileName).match(/htm/)) {
            fileName += '.html';
        }
        return fileName;
    }
}

module.exports = ParseUrl;