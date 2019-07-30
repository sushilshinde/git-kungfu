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
const labels = [label.QA_PASS];

//issues.getIssues(state.OPEN,labels).then(() => {})
//2970,2937,2918,2932,2937,2943,3119,3145,3056,2947,3117,3057,3121,3143,3144,2998,3057,2994,3007,3149,3114

//prs.getPRs(state.OPEN,labels).then(() => {})
