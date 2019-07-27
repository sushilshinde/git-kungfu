const Octokit = require('@octokit/rest')
require('dotenv').config()

const rgx = /\[MSFT.*?\]/g
const promises = []
const octokit = new Octokit({
    auth: process.env.github_auth_token,
    baseUrl: 'https://api.github.com'
   })

addLabels => function(number,labels){
    octokit.issues.addLabels({
        owner:process.env.owner,
        repo:process.env.repo,
        issue_number:number,
        labels:labels
      }).then(rs => {
          //console.log(rs)
      })
}

for(let i =1 ; i < 200; i++){
    let p = octokit.issues.listForRepo({
        owner:"topcoder-platform",
        repo:"community-app",
        per_page:99,
        page:i,
        state: 'open'
      }).then(rs => {
        let t = rs.data.forEach(element => {
            if(rgx.test(element.title)){
              element.labels.forEach(function(item){
                if(item.name !== 'Accessibility'){
                  console.log("--------------------------")
                  console.log(element.title)
                  console.log(element.labels)
                }
              })
                //addLabels(element.number,['Accessibility'])
            }
        })
     })
    promises.push(p)
}

Promise.all(promises).then(()=>{
    console.log("----------- Finished adding label ------------")
})
