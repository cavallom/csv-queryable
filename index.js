const csvReader = require("./utils/csvReader");
const q = require("./utils/csv");
const pjson = require('./package.json');

let organizations;
let csvtest = new q.csv(
    csvPath = NaN
    , csvDelimiter = NaN
    , ignoreEmptyRows = NaN
    , csvArray = NaN
    , header = NaN
    , columns = NaN
    , where = NaN
    , limit = NaN
    );

let csv = new q.csv(
    csvPath = '/Users/mcavallo/Desktop/dev/GitHub/csv-queryable/csv/organizations-100000.csv'
    , csvDelimiter = ','
    , ignoreEmptyRows = true
    , csvArray = organizations
    , header = NaN
    , columns = NaN
    , where = NaN
    , limit = NaN
    );

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
function csvArrayToJsonArray(csvArray, columns){
    let jrisultato = csvReader.csvArrayRowsToJson(csvArray.map(r => columns.map(i => r[columns.indexOf(i)])), columns);
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


module.exports = {itWorks, csvMemorize, select, csvArrayToJsonArray, selectFromArray, csvtest}