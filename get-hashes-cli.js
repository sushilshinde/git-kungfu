#!/usr/bin/env node
const Octokit = require("@octokit/rest");
require("dotenv").config();

const promises = [];
const octokit = new Octokit({
  auth: process.env.github_auth_token,
  baseUrl: "https://api.github.com"
});

const prsArg = process.argv[2]; //value will be "node"
var issues = prsArg.split(',').map(function(item) {
  return parseInt(item, 10);
});

//const issues = [3174,342]

function print(item) {
    console.log(item.html_url + "," + item.merge_commit_sha);
    //console.log(`https://github.com/${process.env.owner}/${process.env.repo}/issues/${item.number}` + "," + getString(item.labels));
  
}
for(i in issues) {
    octokit.pulls.get({
        owner: process.env.owner,
        repo: process.env.repo,
        pull_number:issues[i]
      })
      .then(rs => {
          print(rs.data);
        }).catch(e => console.log(e));
}
