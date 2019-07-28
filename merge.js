const Octokit = require("@octokit/rest");
require("dotenv").config();
const fs = require('fs');
var schedule = require('node-schedule');

const numbers = [6,7,8,9]
let count = 0 

const INTERVAL = {
    FIVE_MIN: "*/1 * * * *",
    FIVE_SEC:'*/5 * * * * *'
}

const promises = [];
const octokit = new Octokit({
  auth: process.env.github_auth_token,
  baseUrl: "https://api.github.com"
});

function print(number,message){
    fs.appendFile('merge.csv', `\r\nhttps://github.com/topcoder-platform/community-app/pull/${number},${message}`, function (err) {
        if (err) throw err;
        console.log(`\r\n${number} - ${message}`);
      });

}

function runJob(){
 
    if(count === numbers.length) process.exit()
 
    console.log("Merging : "+numbers[count])
    octokit.pulls.merge({
        owner:"sushilshinde",//process.env.owner,
        repo:"git-kungfu",//process.env.repo,
        pull_number:numbers[count]
    }).then(data => {
        print(numbers[count],data.data.sha)        
        count++
    }).catch(e => {
        print(numbers[count],"Merge Failed")        
        count++
    })
}
         
var j = schedule.scheduleJob(INTERVAL.FIVE_SEC, runJob);

// 5 lakh -i20 (2016), Baleno - 6lakh, ertiga - 6 lakh  
//https://github.com/topcoder-platform/community-app/pull/2947



