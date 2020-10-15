const express = require('express');
const router = express.Router();
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
const app = express();
// For parsing form
const bodyParser = require('body-parser');
// For generating Token
const jwt = require('jsonwebtoken');
// For encrypting Password
const bcrypt = require('bcryptjs');
// For Secert Token
const config = require('../config');
// For User Schema
const User = require('../user/User');
const session = require('express-session');
const News = require('../news/News');

const collection_name = 'newslists';

const connection = require('../db');

router.use(session({secret: 'edurekaSecert1', resave: false, saveUninitialized: true}));
app.use(express.static(__dirname+'/public'));
app.set('view engine', 'ejs');
app.set('views', './views');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());



// Get Data from datbase and display on index
router.get('/editnews', (req,res)=>{

  News.find({}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.render('editnews.ejs',{data:result})
    }
/*     collection.find({}).toArray(function(err, data){
      if(err) throw err;
      res.render('editnews.ejs',{data:result})
    }) */
  })
})


// Get Data from datbase and display on index
router.get('/getnews', (req,res)=>{
  News.find({}, function(err, result) {
    if (err) {
      res.send(err)
    } else {
      res.send(result)
    }
  })
})

// Info of logined User
router.post('/addnews', function(req, res) {
/*     var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' }); */
      
      // res.status(200).send(decoded);

      News.create({
        title : req.body.title,
        description : req.body.description,
        url : req.body.url,
        urltoimg : req.body.urltoimg,
        publishedAt : req.body.published,

      },
      function (err, news) {
        if (err) return res.status(500).send("There was a problem in adding news.")
        res.redirect(`/users/admin`)
       });
    
  });



  module.exports = router;