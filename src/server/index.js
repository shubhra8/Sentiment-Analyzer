var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

// Cors allows the browser and server to communicate without any security interruptions
const cors = require('cors');

// Require the Aylien npm package
const API_KEY = process.env.API_KEY;
const PORT = process.env.PORT || 3001;
var aylien = require("aylien_textapi");
var textapi = new aylien({
    application_key: process.env.API_KEY
 });
console.log(`Your API key is ${process.env.API_KEY}`);

const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

//app.use(express.static('dist'))

//console.log(__dirname)

// API
const apiUrl = 'https://api.meaningcloud.com/sentiment-2.1?'
const apiKey = '3bf108b2e5c3a41b6e54c55d5fdfd432'
//console.log(`Your API Key is ${process.env.API_KEY}`);
let userurl = [] // const does not work

console.log(__dirname)

app.post('/addData', async function (req , res)  {
userurl = req.body.url;
const apiLink= `${apiUrl}key=${API_KEY}&url=${userurl}&lang=en`
const response = await fetch(apiLink)
const Data = await response.json()
    console.log(Data)
    res.send(Data)
})

app.get('/', function (req, res) {
   // res.sendFile("dist/index.html")
   // res.sendFile("C:/evaluate-news-nlp/dist/index.html");
   // res.sendFile('index.html', { root: 'C:/evaluate-news-nlp/dist' })
    res.sendFile('/evaluate-news-nlp/dist/index.html'));
})

// designates what port the app will listen to for incoming requests
app.listen(PORT, function () {
    console.log('Example app listening on port !')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
