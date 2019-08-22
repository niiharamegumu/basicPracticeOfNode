"use strict";

let express = require("express");
let ejs = require("ejs");
let eachPageLinkData = require("./conf/data/pageData");

let app = express();
app.engine("ejs", ejs.renderFile);
app.use(express.static("public"));

app.get("/", (req, res) => {
  const key = "top";
  const thisPageLinkData = getThisPageLinkData(key, eachPageLinkData);
  const notThisPageLinkData = getNotThisPageLinkData(key, eachPageLinkData);
  res.render("index.ejs",{
    thisPageData: thisPageLinkData,
    notThisPageData: notThisPageLinkData
  });
});

app.get("/other", (req, res) => {
  const key = "other";
  const thisPageLinkData = getThisPageLinkData(key, eachPageLinkData);
  const notThisPageLinkData = getNotThisPageLinkData(key, eachPageLinkData);
  res.render("index.ejs",{
    thisPageData: thisPageLinkData,
    notThisPageData: notThisPageLinkData
  });
});

app.get('/form', (req,res) => {
  const key = "form";
  const thisPageLinkData = getThisPageLinkData(key, eachPageLinkData);
  const notThisPageLinkData = getNotThisPageLinkData(key, eachPageLinkData);
  res.render("index.ejs",{
    thisPageData: thisPageLinkData,
    notThisPageData: notThisPageLinkData
  });
});

app.listen(3000, () => {
  console.log("Server Start");
});

function getThisPageLinkData (key, eachPageLinkData) {
  return eachPageLinkData.find(data => {
    return data.key === key
  });
}

function getNotThisPageLinkData (key, eachPageLinkData) {
  return eachPageLinkData.filter(data => {
    return data.key !== key
  });
}