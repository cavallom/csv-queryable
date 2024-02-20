const csvReader = require("./utils/csvReader");
const q = require("./utils/query");
const pjson = require('./package.json');

/**
 * Just to check the success of the installation, also returns basic package information.
 * No parameters.
 */
function itWorks() {
    return JSON.stringify({"itWorks": "Yes, it works!"
    , "package": pjson.name
    , "version": pjson.version
    });
}

function select(select, from, where, limit) {
    const nq = new q.query(select,from,where,limit);
    let result = nq.select();
    return result;
}

function selectFromArray(csvArray, header, columns, where, limit) {
    return csvReader.selectFromCsvArray(csvArray,header,columns, where, limit);
}
/**
 * Validates a CSV file and return true or false.
 *
 * @param {string} csvFile - The path to the CSV file.
 * @param {string} csvDelimiter - The CSV separator character, not mandatory. Default value = ','.
 * @param {boolean} ignoreEmptyRows - Non-mandatory parameter to handle the blank line at the end of the file.
 */
function csvArrayToJsonArray(csvArray,header, cols){
    let jrisultato = csvReader.csvArrayRowsToJson(csvArray.map(r => cols.map(i => r[header.indexOf(i)])), cols);
    return jrisultato
}
function csvMemorize(csvFile, csvDelimiter = ',', ignoreEmptyRows = true) {

    const start = Date.now();
    let result = true;

    try
    {
        let rowsInCsv = csvReader.csvFileLines(csvFile, csvDelimiter, ignoreEmptyRows).slice();
        let firstLineLength = rowsInCsv[0].length;

        rowsInCsv.forEach(element => {
            if (element.length != firstLineLength) {
                result = false;
            }
        });
        const end = Date.now();
        console.log("executiontime: " + `${(end - start)}ms.`);

        return rowsInCsv;
    } catch (error) {
        const end = Date.now();
        console.log("executiontime: " + `${(end - start)}ms.`);
        console.log(error.message)
        result = false;
        return result;
    }
}

// function select(s){
//     function from(f){
//         function where(w){
//             function limit(l){
//                 return s + f + w + l;
//             }
//             return limit;
//         }
//         return where;
//     }
//     return from;
// }

function columns(s){
    return 'SELECT ' + s;
}

function from(f){
    return ' FROM ' + f;
}

function where(w){
    return ' WHERE ' + w;
}

function limit(l){
    return ' LIMIT ' + l;
}


module.exports = {itWorks, csvMemorize, columns, from, where, limit, select, csvArrayToJsonArray, selectFromArray}