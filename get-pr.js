const Octokit = require("@octokit/rest");
require("dotenv").config();
const fs = require('fs');
var schedule = require('node-schedule');

const prs = [2917,2918,2919,2921,2922,2931,2934,2936,2937,2938,2943,2943,2945,2950,2965,2976,2977,2990,2997,2999,3004]

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

