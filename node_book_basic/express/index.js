const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();



app.engine('ejs', ejs.renderFile);
app.use(bodyParser.urlencoded({
    extended:true
}));

app.get('/',function(req,res){
    console.log('----get----');
    console.log('nameは'+req.query.name);
    console.log('ageは'+req.query.age);
    res.render('temp.ejs',{});
});

app.post('/',function(req,res){
    console.log('----post----');
    console.log('nameは'+req.body.name);
    console.log('ageは'+req.body.age);
    res.render('temp.ejs',{});
});

const server = app.listen(1234,function(){
    console.log('start');
});