const Octokit = require("@octokit/rest");
const diff = require('hyperdiff')
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
  //console.log(item.html_url + "," + getString(item.labels));
  console.log(item.number)
}

function getPRs(state,searchForLables) {
  
  for (let i = 1; i < 100; i++) {
    let p = octokit.pulls
      .list({
        owner: process.env.owner,
        repo: process.env.repo,
        per_page: 99,
        page: i,
        state: state,
        labels: searchForLables
      })
      .then(rs => {
        rs.data.forEach(element => {
          let ls = element.labels.map((i) => i.name)          
          let result = diff(ls,searchForLables)
          if (result.common.length > 0 ) {
              print(element);
          }
        });
      })
      .catch(e => console.log(e));
    promises.push(p);
  }
  return Promise.all(promises);
}

module.exports = {
	getPRs: getPRs
};