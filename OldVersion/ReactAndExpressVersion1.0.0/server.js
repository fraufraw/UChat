//  Creates an Express application (import express module)
var express = require('express'); 
var app = express(); // express() function is a top-level function exported by the express module

// import the file system module
var fs = require('fs'); 

var bodyParser = require('body-parser');

// __diename is is an environment variable that tells you the absolute path of the directory containing the currently executing file
// set views = __dirname
app.set('views', __dirname);
// EJS is an template engine
// set EJS as the view engine for the Express application using
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true  
}));


// Dispaly HOME page
app.get('/api/POSTS', function (req, res) {
  const POSTS = getData("home.txt");
  
  res.json(POSTS);
  // res.render() will look in a views folder for the view, sned view to the user
  //res.render('home', {message_list: array});
});

/* 
// Display New Post page
app.get('/new', function (req, res) {
  // need to add code for posting new meaasge  
  res.render('new');
});
app.post('/new', function (req, res) {
  // need to add code for posting new meaasge  
  res.render('new');
})


// Display title1 page
app.get('/title1', function (req, res) {
  let array = getData("chat1.txt");
  
  res.render('title1', {message_list: array});
});
app.post('/title1', function (req, res) {
  let array = getData("chat1.txt");
  
  if (req.body.message.length > 0) {
    array.push(req.body.message);
    fs.writeFileSync("chat1.txt", array.join("\r\n"));
  }
  
  res.render('title1', {message_list: array});
})



// Display title2 page
app.get('/title2', function (req, res) {
  let array = getData("chat2.txt");

  res.render('title2', {message_list: array});
});
app.post('/title2', function (req, res) {
  let array = getData("chat2.txt");
  
  if (req.body.message.length > 0) {
    array.push(req.body.message);
    fs.writeFileSync("chat2.txt", array.join("\r\n"));
  }
  
  res.render('title2', {message_list: array});
})
*/

function getData(filename) {
  let data = fs.readFileSync(filename, {encoding: "utf-8"});
  var array = [];
  if (data.length > 0) {
    array = data.split(/\r\n|\r|\n/);
  }
  return array;
}

// listen to a port 3001
app.listen(3001, ()=>console.log('Server started on port 3001'));