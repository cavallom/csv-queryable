const q = require('csv-queryable');
const header = new Array("Index","Organization Id","Name","Website","Country","Description","Founded","Industry","Number of employees");
const cols = new Array("Website","Country");

//console.log(q.itWorks());

let a = q.csvMemorize('/Users/mcavallo/Desktop/dev/GitHub/csv-queryable/csv/organizations-500000.csv');
let b = q.selectFromArray(a, header, cols, '', '');
let c = q.csvArrayToJsonArray(b, cols, cols);

console.log(c);
console.log(c.length);

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