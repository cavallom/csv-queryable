const fs = require('node:fs');

/**
 * @param {string} csvFile - The csv file to be read
 * @param {separator} csvDelimiter - The csv delimiter
 * @param {boolean} ignoreEmptyRows - Ignore the empty lines
 */
function csvFileLines(csvFile, csvDelimiter = ',', ignoreEmptyRows = true) {
  
  const pattern = /".*?"/g;

  const readLines = csvFile =>
  fs
  .readFileSync(csvFile)
  .toString('UTF8')
  .split('\n')
  .filter(function (el) {
      if (ignoreEmptyRows) {
          return el != '';
      } else {
          return el == el;
      }
  })
  .map(function (row) {
    //   while(patternFound = pattern.exec(row))
    //   {
    //       row = row.replace(patternFound, patternFound.toString().replaceAll(',','@'));
    //   }
    //   return row.split(csvDelimiter);

    //return row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
    return row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
  });

  return readLines(csvFile).slice();;

}
  
module.exports = { csvFileLines };