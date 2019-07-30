const Octokit = require("@octokit/rest");
require("dotenv").config();

const promises = [];
const octokit = new Octokit({
  auth: process.env.github_auth_token,
  baseUrl: "https://api.github.com"
});


const issues = [2748,2750,2742,2749,2842,2850,2837,2755,2764,2754,2835,2886,2786,2910,2836,2805,2802,2844,2841]

function getString(arr) {
    let newArr = arr.map(i => i.name);
    return newArr.join();
}

function print(item) {
    console.log(item.html_url + "," + getString(item.labels));
    //console.log(`https://github.com/${process.env.owner}/${process.env.repo}/issues/${item.number}` + "," + getString(item.labels));
  
}

for(i in issues) {

    octokit.issues.get({
        owner: process.env.owner,
        repo: process.env.repo,
        issue_number:issues[i]
      })
      .then(rs => {
          print(rs.data);
        }).catch(e => console.log(e));
}
