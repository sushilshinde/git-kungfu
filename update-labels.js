const Octokit = require("@octokit/rest");
require("dotenv").config();

const promises = [];
const octokit = new Octokit({
  auth: process.env.github_auth_token,
  baseUrl: "https://api.github.com"
});

const issues = [2757,2803,2854,2751,2752,2741,2822,2740,2873,2846,2902,2820,2825,2911,2824,2810,2832,2839,2840,2811,2907,2796]

for(i in issues) {
  octokit.issues.addLabels({
    owner:process.env.owner,
    repo:process.env.repo,
    issue_number:issues[i],
    labels:["Ready for Prod QA"]
  }).then(rs => {
      //console.log(rs)
  }).catch(e => console.log(e))

  octokit.issues.removeLabel({
      owner:process.env.owner,
      repo:process.env.repo,
      issue_number:issues[i],
      name:"QA Pass"
    }).then(rs => {
      //console.log(rs)
  }).catch(e => console.log(e))
}
