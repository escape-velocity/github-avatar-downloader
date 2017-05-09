var GITHUB_USER = "escape-velocity";
var GITHUB_TOKEN = "97b143ab994938cb249ba0075e86859f02d5eb04";

var request = require('request');
var fs = require('fs');

var repoOwner = process.argv[2];
var repoName = process.argv[3];

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  };
  console.log(options);
  request(options, function(err, response, body){
    if (err) {
      throw err;
    } else {
      cb(err, body);
    }
  });
}

function downloadImageByURL(url, filePath) {
  request(url).pipe(fs.createWriteStream(filePath));
  console.log("URL: " + url + ", filepath: " + filePath);
}

getRepoContributors(repoOwner, repoName, function(err, body) {
  let parsedResults = JSON.parse(body);
  for (var i = 0; i < parsedResults.length; i++) {
    downloadImageByURL(parsedResults[i]["avatar_url"], `avatars/${i}.jpg`);
  }
  // console.log("Errors:", err);
  // console.log("Result:", parsedResults);
  // console.log(parsedResults);
});



