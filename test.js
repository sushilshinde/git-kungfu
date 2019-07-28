const diff = require('hyperdiff')
 
var result = diff(
  [],
  [1, 2, 4, 5, 6, 0, 9, 10]
)
 
console.log(result)