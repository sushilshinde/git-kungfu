const Octokit = require('@octokit/rest')
require('dotenv').config()

const label = {
  CODE_REVIEW_PASSED:'Code Review Passed',
  CODE_REVIEW_Failed:'Code Review Failed'
}

const searchForLables = [label.CODE_REVIEW_PASSED]

const promises = []

const octokit = new Octokit({
    auth: process.env.github_auth_token,
    baseUrl: 'https://api.github.com'
   })

function getString(arr) {
    let newArr = arr.map((i) => i.name)
    return newArr.join()
}

function print(item){
  console.log(item.html_url+","+(getString(item.labels)))
}  

for(let i =1 ; i < 100; i++){
    let p = octokit.pulls.list({
        owner:process.env.owner,
        repo:process.env.repo,
        per_page:99,
        page:i,
        state: 'open',
        labels:searchForLables
      }).then(rs => {
        rs.data.forEach(element => {
          
          if(element.labels.filter((l) => l.name === label.CODE_REVIEW_PASSED ).length > 0) {
            print(element)
          }

        })
     }).catch(e => console.log(e))
    promises.push(p)
}

Promise.all(promises).then(()=>{
})

