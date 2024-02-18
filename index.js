const csvReader = require("./utils/csvReader");
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

/**
 * Validates a CSV file and return true or false.
 *
 * @param {string} csvFile - The path to the CSV file.
 * @param {string} csvDelimiter - The CSV separator character, not mandatory. Default value = ','.
 * @param {boolean} ignoreEmptyRows - Non-mandatory parameter to handle the blank line at the end of the file.
 */
function csvMemorize(csvFile, csvDelimiter = ',', ignoreEmptyRows = true) {

    const start = Date.now();
    let result = true;

    try
    {
        let rowsInCsv = csvReader.csvFileLines(csvFile, csvDelimiter, ignoreEmptyRows).slice();
        let firstLineLength = rowsInCsv[0].length;

        const header = new Array("Index","Organization Id","Name","Website","Country","Description","Founded","Industry","Number of employees");
        let query = "WHERE (Country = 'France' OR Country = 'Indonesia') AND Description LIKE 'support' AND Description LIKE '.org' LIMIT 0, 10";
        let test = rowsInCsv.filter(function(e) {
            return (e[4] == 'China' || e[4] == 'Chad') && e[3].search('.com') > -1;
        }).slice(0,10);

        rowsInCsv.forEach(element => {
            if (element.length != firstLineLength) {
                result = false;
            }
        });
        const end = Date.now();
        console.log("executiontime: " + `${(end - start)}ms.`);
    
        return result;
    } catch (error) {
        const end = Date.now();
        console.log("executiontime: " + `${(end - start)}ms.`);
        console.log(error.message)
        result = false;
        return result;
    }
}

module.exports = {itWorks, csvMemorize}