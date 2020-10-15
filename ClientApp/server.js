const app = require('./app');
const express = require('express');
const request = require('request');
const bodyParser =  require('body-parser');
const iplocate = require('node-iplocate');
const publicIp = require('public-ip');

const port = 3500;


/* const session = require('express-session'); */
/* app.use(session({secret: 'edurekaSecert'})); */

app.use(express.static(__dirname+'/public'));
app.set('view engine', 'ejs');
app.set('views', './views');

var apiUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?q="
var endUrl = "&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29"

var newsapi="http://localhost:3000/news/getnews"



app.get('/home',(req,res) => {
  publicIp.v4().then(ip => {
    iplocate(ip).then(function(results) {
      location = JSON.stringify(results.city, null, 2);
      location = location.toString().substring(1,location.toString().length-1)
      const wetherurl = apiUrl + location + endUrl
      request(wetherurl,(err,response)=>{
        if(err) throw err;
        var output = JSON.parse(response.body)
           request(newsapi,(error,newresponse)=>{
          if(err) throw error;
          var newslist = JSON.parse(newresponse.body)
          res.render('index',{latestnews:newslist,result:output})
        })
      })
    })
  })
})

app.get('/',(req,res) => {
  publicIp.v4().then(ip => {
    iplocate(ip).then(function(results) {
      location = JSON.stringify(results.city, null, 2);
      location = location.toString().substring(1,location.toString().length-1)
      const wetherurl = apiUrl + location + endUrl
      request(wetherurl,(err,response)=>{
        if(err) throw err;
        var output = JSON.parse(response.body)
           request(newsapi,(error,newresponse)=>{
          if(err) throw error;
          var newslist = JSON.parse(newresponse.body)
          res.render('index',{latestnews:newslist,result:output})
        })
      })
    })
  })
})

app.get('/sports',(req,res) => {
  res.render('sports')
})
app.get('/aboutus',(req,res) => {
  res.render('aboutus')
})
app.get('/contactus',(req,res) => {
  res.render('contactus')
})

const server = app.listen(port, () => {
  console.log('Express server listening on port ' + port);
});