const Octokit = require("@octokit/rest");
require("dotenv").config();
const fs = require('fs');
var schedule = require('node-schedule');

const prs = [2978]

const octokit = new Octokit({
    auth: process.env.github_auth_token,
    baseUrl: "https://api.github.com"
  });

for(pr in prs){
    octokit.pulls.get({
        owner:process.env.owner,
        repo:process.env.repo,
        pull_number:prs[pr]
    }).then(data => {
        console.log(data.data.url+","+data.data.merge_commit_sha)
    }).catch(e => {
        console.log(e)
    })
}

