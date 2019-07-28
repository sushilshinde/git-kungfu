const prs = require("./get-prs");
const issues = require("./get-issues");

const label = {
    CODE_REVIEW_PASSED: "Code Review Passed",
    CODE_REVIEW_Failed: "Code Review Failed",
    QA_PASS:"QA Pass",
    ACCESSIBILITY:"Accessibility"
  };
const state = {
    OPEN:"open",
    CLOSED:"closed"
}
const labels = [label.QA_PASS,label.ACCESSIBILITY];

issues.getIssues(state.OPEN,labels).then(() => {})

//prs.getPRs(state.OPEN,labels).then(() => {})
