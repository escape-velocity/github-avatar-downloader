var GITHUB_USER = "escape-velocity";
var GITHUB_TOKEN = "Ybd5a919f8e36073f35e49e174d1de0828880a2a3";

var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
  url: 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
  headers: {
    'User-Agent': 'escape-velocity'
  }
};
  request(options, cb);
console.log(getRepoContributors);
}

getRepoContributors(process.argv[2], process.argv[3], function(err, response, body) {
  let parsedResults = JSON.parse(body);
  for (var i = 0; i < parsedResults.length; i++) {
    console.log(parsedResults[i]["avatar_url"]);
    downloadImageByURL(parsedResults[i]["avatar_url"], `avatars/${i}.jpg`)
  }

    console.log("Errors:", err);
    console.log("Result:", parsedResults);
    console.log(parsedResults);
});
  function downloadImageByURL(url, filePath) {
  request(url).pipe(fs.createWriteStream(filePath))
// }
// ////////////////////


//var request = require('request');

//console.log('Welcome to the GitHub Avatar Downloader!');

// function getRepoContributors(repoOwner, repoName, cb) {
//   var options = {
//   url: 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
//   headers: {
//     'User-Agent': "escape-velocity"
//   }
// };
//   request(options, cb);

// }

// getRepoContributors(process.argv[2], process.argv[3], function(err, response, body) {
//   let parsedResults = JSON.parse(body);
//   for (var i = 0; i < parsedResults.length; i++) {
//     console.log(parsedResults[i]["avatar_url"]);
//     downloadImageByURL(parsedResults[i]["avatar_url"], `avatars/${i}.jpg`)
//   }
  // console.log(parsedResults);
  // console.log("Errors:", err);
  // console.log("Result:", parsedResults);
// });
//   function downloadImageByURL(url, filePath) {
//   request(url).pipe(fs.createWriteStream(filePath))
// }