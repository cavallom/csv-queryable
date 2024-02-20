const q = require('csv-queryable');
const header = new Array("Index","Organization Id","Name","Website","Country","Description","Founded","Industry","Number of employees");
const columns = new Array("Name","Website","Country","Founded");
const where = new Array(["Country","%%","Ital"],["Founded","!=","1999"]);
const limit = new Array(1,500);

//console.log(q.itWorks());

let a = q.csvMemorize('/Users/mcavallo/Desktop/dev/GitHub/csv-queryable/csv/organizations-100000.csv');
const start = Date.now();
let b = q.selectFromArray(a, header, columns, where, limit);
let c = q.csvArrayToJsonArray(b, columns);
const end = Date.now();
//this.getFilteredJsonArray(this.getFilteredJsonArray(test, columns, "Country", "China"), columns, "Website", "http://sharp.com/")

console.log(c);
console.log(JSON.parse(c).length);
console.log("executiontime: " + `${(end - start)}ms.`);
