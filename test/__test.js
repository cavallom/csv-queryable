const _csvPath = '/Users/mcavallo/Desktop/dev/GitHub/csv-queryable/csv/organizations-100000.csv';
const _csvDelimiter = ','
const _ignoreEmptyRows = true;
const _header = new Array("Index","Organization Id","Name","Website","Country","Description","Founded","Industry","Number of employees");
const _columns = new Array("Name","Website","Country","Founded");
const _where = new Array(["Country","%%","Ital"],["Founded","!=","1999"]);
const _limit = new Array(1,500);

const csvlib = require("../utils/csv");

let newcsv = new csvlib.csv(_csvPath
    , _csvDelimiter
    , _ignoreEmptyRows
    , null
    , _header
    , _columns
    , _where
    , _limit);

const start = Date.now();

newcsv.memorize();

const end = Date.now();

console.log("executiontime: " + `${(end - start)}ms.`);

newcsv.select();
//console.log(newcsv.select());
