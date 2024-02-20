const q = require('csv-queryable');
const header = new Array("Index","Organization Id","Name","Website","Country","Description","Founded","Industry","Number of employees");
const colums = new Array("Name","Website","Country","Founded");
const where = new Array(["Country","%%","Ital"],["Founded","!=","1999"]);
const limit = new Array(10,100);

//console.log(q.itWorks());

let a = q.csvMemorize('/Users/mcavallo/Desktop/dev/GitHub/csv-queryable/csv/organizations-2000000.csv');
const start = Date.now();
let b = q.selectFromArray(a, header, colums, where, limit);
let c = q.csvArrayToJsonArray(b, colums, colums);
const end = Date.now();
//this.getFilteredJsonArray(this.getFilteredJsonArray(test, columns, "Country", "China"), columns, "Website", "http://sharp.com/")

console.log(c);
console.log(JSON.parse(c).length);
console.log("executiontime: " + `${(end - start)}ms.`);

// console.log(q.select("camp1, camp2")
// ("tabella1")
// ("camp1 = 'ciao'")
// ("0, 5"));

//const obj = new q.fizz('test');

//let prova = obj.buzz('ciao');
//let prova = q.select("camp1, camp2")("tabell1a")("")("");

// let prova = (new q.outer(1)).inner(2);
// console.log(prova);

//let prova = q.doQuery([1],2,[3],[4]);

/* OK!!!
let prova = q.select(
    q.columns("campo1, campo2")
    ,q.from("tabella")
    ,q.where("campo1 = 'test'")
    , q.limit("0,1"));
console.log(prova);
*/