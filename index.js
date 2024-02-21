
const fs = require('node:fs');

memorize = function(csvPath, csvDelimiter, ignoreEmptyRows) {    

    const start = Date.now();

    const expression = `(".*?"|[^"${csvDelimiter}]+)(?=\\s*${csvDelimiter}|\\s*$)`;
    const regex = new RegExp(expression, 'g');

    try
    {
        const csvLines = csvPath =>
        fs
        .readFileSync(csvPath)
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
            return row.match(regex);
        });
        
        const end = Date.now();
        console.log("executiontime: " + `${(end - start)}ms.`);

        let csvrows = csvLines(csvPath);

        //bidimensional array check to find bad formatting csv
        if (!Number.isInteger(csvrows.flat().length/csvrows.length)
            || csvrows.flat().length === csvrows.length)
        {
            throw new customError("The csv file has not passed formal validation!");
        }

        return csvrows;

    } catch (error) {
        const end = Date.now();
        console.log("executiontime: " + `${(end - start)}ms.`);
        console.log(error.message)
    }
}

select = function(csvArray, header, columns, where, limit) {

    const start = Date.now();

    try
    {
        where.forEach(element => {
            csvArray = csvArray.filter(function(e) {
                switch(element[1])
                {
                    case '==':
                    if (e[header.indexOf(element[0])] == element[2]) {
                        return e;
                    }
                    break;
                    case '!=':
                    if (e[header.indexOf(element[0])] != element[2]) {
                        return e;
                    }
                    break;
                    case '%%':          
                    if (e[header.indexOf(element[0])].search(element[2]) > -1) {
                        return e;
                    }
                    break;
                }          
            });
        });
    
        // map with returned colums
        csvArray = csvArray.map(r => columns.map(i => r[header.indexOf(i)])).slice(limit[0], limit[1]);
    
        // JSON output
        const csvArrayToJson = (rows) => {  
            return rows.reduce((jsonArray, row) => {
                const item = row.reduce((item, value, index) => {
                return {...item, [columns[index]]: value};
                }, {});
                return jsonArray.concat(item);
            }, []);
        };
        
        const csvJsonArray = csvArrayToJson(csvArray);
            
        return JSON.stringify(csvJsonArray);

    } catch (error) {
        const end = Date.now();
        console.log("executiontime: " + `${(end - start)}ms.`);
        console.log(error.message)
    }
}

customError = function(message = "") { 
    this.message = message; 
    this.name = "customError"; 
} 
customError.prototype = Error.prototype;

module.exports = { memorize, select };
