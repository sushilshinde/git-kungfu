const Octokit = require('@octokit/rest')
require('dotenv').config()

const promises = []
const octokit = new Octokit({
    auth: process.env.github_auth_token,
    baseUrl: 'https://api.github.com'
   })

function addLabels(number,labels){
    octokit.issues.addLabels({
        owner:process.env.owner,
        repo:process.env.repo,
        issue_number:number,
        labels:labels
      }).then(rs => {
          //console.log(rs)
      }).catch(e => console.log(e))
}

for(let i =1 ; i < 100; i++){
    let p = octokit.issues.listForRepo({
        owner:process.env.owner,
        repo:process.env.repo,
        per_page:99,
        page:i,
        state: 'open'
      }).then(rs => {
        rs.data.forEach(element => {
            if(element.title.indexOf("MSFT") > 0){
              let hasAccessibilityLabel = element.labels.filter((l) => l.name === 'Accessibility' ).length > 0;
                if(!hasAccessibilityLabel){
                  console.log(element.title)
                  addLabels(element.number,['Accessibility'])
                }
            }
        })
     }).catch(e => console.log(e))
    promises.push(p)
}

Promise.all(promises).then(()=>{
    console.log("----------- Finished adding label ------------")
})
