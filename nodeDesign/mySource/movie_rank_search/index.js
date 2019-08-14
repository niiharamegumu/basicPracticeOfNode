const request = require('request');
const cheerio = require('cheerio');

const baseUrl = 'https://eiga.com';
const recentMovieUrl = baseUrl + '/now/all/rank/';
let movieData = [];

request(recentMovieUrl, (err, res, body) => {
    if (err) {
        console.log(err);
    }
    try {
        const $ = cheerio.load(body,{
            decodeEntities: false
        });

        $('.list-block').each((i, elm) => {
            let classImgBox = elm.children[1];
            let classTxtBox = elm.children[3];
            let obj = {
                title: classTxtBox.children[1].children[0].children[0].data,
                img: classImgBox.children[1].children[0].attribs.src,
                release_date: classImgBox.children[2].next.children[0].data,
                ditail_page: baseUrl + classTxtBox.children[1].children[0].attribs.href
            }
            movieData.push(obj);
        });
        movieData = JSON.stringify(movieData)
        console.log(movieData);
    }catch (err) {
        console.log(err);
    }
});
