const express = require('express');
const router = express.Router();
const fileHandler = require('fs'); //Imports file system module.
const bodyParser = require('body-Parser'); //Imports body parser to prevent problems retrieving the data from body in Postman.
const app = express();
const path = require('path');
const fetch = require('node-fetch');
const helmet = require('helmet');

let fav = require('./config/favourite.json')
let conString = (x) =>  JSON.stringify(x) //Stringify any data parsed through function.

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(function(req, res, next) {
    //must be included these first two
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  next();
});
app.use(helmet());
app.use(express.static(path.resolve(__dirname, './client/build')));

router.get("/media", (req, res) => {
    fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(req.query.name)}&media=${encodeURIComponent(req.query.type)}&limit=50`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        res.send(JSON.stringify(data))
    })
})

router.post('/media', (req, res) => { //Post adds to the a new object to 'api.json'.
    fav.push(req.body);
    fileHandler.writeFile('./config/favourite.json', conString(fav), (err) => { //It overwrites the json file with the new array.
    });
})

router.get("/favourites", (req, res) => {
    fileHandler.readFile('./config/favourite.json', function(err, data) {
        res.send(data) //Returns the data recieved from the json file.
    })
})

router.delete('/favourites', (req, res) => { //Delete removes an object from 'api.json'.
    fav = fav.filter( (item) => { //It returns all the objects except the id requested.
        return item.trackId !== req.body.trackId //It returns the new array containing all the objects except the object thats id was requested.
    })

    fileHandler.writeFile('./config/favourite.json', conString(fav), (err) => { //It overwrites the json file with the new array.
    });
})

module.exports = router;
