const args = process.argv.slice(2);
const request = require('request');
const fs = require("fs");

request(args[0], (error, response, body) => {
  let path = args[1];
  let data = body;
  
  // console.log('error:', error); // Print the error if one occurred
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.
  if (response.statusCode >= 400) {
    return console.error("Error " + response.statusCode);
  }
  
  fs.writeFile(path, data, (err) => {
    if (err) {
      return console.error(err);
    }
  });

  fs.stat(path, (err, stats) => {
    if (err) {
      return console.error(err);
    }
    let size = stats.blksize;
    console.log(`Downloaded and saved ${size} bytes to ${path}.`);
  });
  
  if (error) {
    console.log(error);
  }
});

/*
fs.writeFile(args[1], data, (err) => {
  if (err) {
    return console.error(err);
  }
});
*/

/*
let path = args[1];
let size = 0;
fs.stat(args[1], (err, stats) => {
  if (err) {
    return console.error(err);
  }
  size = stats.blksize;
});
*/

