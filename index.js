
const fs = require('node:fs');

memorize = function(csvPath, ignoreEmptyRows) {    

    const start = Date.now();

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
            return row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
        });
        
        const end = Date.now();
        console.log("executiontime: " + `${(end - start)}ms.`);

        return csvLines(csvPath);

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

module.exports = { memorize, select };
