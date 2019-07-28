const Octokit = require("@octokit/rest");
require("dotenv").config();
const fs = require('fs');
var schedule = require('node-schedule');

const octokit = new Octokit({
    auth: process.env.github_auth_token,
    baseUrl: "https://api.github.com"
  });

octokit.issues.get({
    owner:process.env.owner,
    repo:process.env.repo,
    issue_number:2799
}).then(data => {
    console.log(data.data)
}).catch(e => {
    console.log(e)
})