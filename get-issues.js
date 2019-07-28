const Octokit = require("@octokit/rest");
require("dotenv").config();

const promises = [];
const octokit = new Octokit({
  auth: process.env.github_auth_token,
  baseUrl: "https://api.github.com"
});

function getString(arr) {
  let newArr = arr.map(i => i.name);
  return newArr.join();
}

function print(item) {
  console.log(item.html_url + "," + getString(item.labels));
  //console.log(`https://github.com/${process.env.owner}/${process.env.repo}/issues/${item.number}` + "," + getString(item.labels));

}

function getIssues(state,labels) {
  for (let i = 1; i < 10; i++) {
    let p = octokit.issues.listForRepo({
        owner: process.env.owner,
        repo: process.env.repo,
        per_page: 99,
        page: i,
        state: state,
        labels: labels
      })
      .then(rs => {
        rs.data.forEach(element => {
          print(element);
        });
      })
      .catch(e => console.log(e));
    promises.push(p);
  }
  return Promise.all(promises);
}

module.exports = {
	getIssues: getIssues
};