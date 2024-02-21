const { dirname } = require('path');
const appDir = dirname(require.main.filename);
const csvPath = '/Users/mcavallo/Desktop/dev/GitHub/csv-queryable/csv/organizations-100000.csv';
const csvArrayDelimiter = ','
const ignoreEmptyRows = true;
const header = new Array("Index","Organization Id","Name","Website","Country","Description","Founded","Industry","Number of employees");
const columns = new Array("Name","Website","Country","Founded");
const where = new Array(["Country","%%","Italy"],["Founded","==","2011"]);
const limit = new Array(1,2);

const csvq = require("csv-queryable");
const start = Date.now();
let a = csvq.memorize(csvPath, ignoreEmptyRows);
const end = Date.now();
console.log("executiontime: " + `${(end - start)}ms.`);
let b = csvq.select(a, header, columns, where, limit, csvArrayDelimiter);
console.log(b);
console.log(JSON.parse(b).length);
