'use strict'
var config = require('./config/config');
var unirest = require('unirest');
const http = require('http')  

console.log('config: ')
console.log(config)
console.log(config.teamcitybaseurl)


const teamcity = config.teamcitybaseurl
const port = 3000


var sys = require('util')
var exec = require('child_process').exec;
function logg(error, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    console.log(error);
}

const requestHandler = (request, resp) => {  
//  exec("ls -la",logg);
    var buildStatus;
    var storyNumber;
    var whoToBlame;
//  exec("say Great Success!",logg);
    unirest.get(teamcity+"/app/rest/builds?locator=buildType:NetstreamTrunk_Faith_BuildMichalFaith,count:1").headers({'Accept': 'application/json'})
.end(function (response) {
  console.log(response.body);
//        var jsonContent = JSON.parse(response.body);
      console.log(response.body.build[0].href);
        buildStatus=response.body.build[0].status
         unirest.get(teamcity+response.body.build[0].href).headers({'Accept': 'application/json'})
.end(function (response) {
            console.log(response.body); 
            console.log(response.body.changes.href);
            unirest.get(teamcity+response.body.changes.href).headers({'Accept': 'application/json'})
.end(function (response) {
            console.log(response.body); 
            console.log(response.body.change[0].href);
             unirest.get(teamcity+response.body.change[0].href).headers({'Accept': 'application/json'})
.end(function (response) {
                 var comment = response.body.comment;
            console.log(response.body); 
            console.log(response.body.comment);
            console.log(comment);
                 var attr = comment.toString().split(" ");
                 storyNumber = attr[0];
                 whoToBlame = attr[1];
                 console.log(storyNumber)
                 console.log(whoToBlame)
                 
                 if(buildStatus==='FAILURE'){
                      exec("say Build Failed! Shame on you "+whoToBlame,logg);  
//                       resp.end("Build Failed! shame on you "+whoToBlame)
                 }else{
                      exec("say Great Success! Good job "+ whoToBlame,logg);
//                       resp.end("Great Success! Good job "+ whoToBlame)
                 }
         }); 
         }); 
         });
});
  console.log(request.url);
   resp.end("Hello world Node js! ")
//                       resp.end("Great Success! Good job "+ whoToBlame)

}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})