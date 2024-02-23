
const fs = require('node:fs');
const pjson = require('./package.json');

let defaultLimit = new Array(0,1000);

itWorks = function() {
    
    const start = Date.now();

    try{
        
        return JSON.stringify({"itWorks": "Yes, it works!"
        , "package": pjson.name
        , "version": pjson.version
        });

    } catch (error) {
        
        const end = Date.now();

        throw new csv_queryable_Error(
            'itWorks'
            , `${(end - start)}ms.`
            , error.message);

    }

}

getLimit = function() {

    const start = Date.now();

    try
    {
        
        return defaultLimit;
    
    } catch (error) {
        
        const end = Date.now();

        throw new csv_queryable_Error(
            'getLimit'
            , `${(end - start)}ms.`
            , error.message);

    }

}

setLimit = function(newdefaultLimit) {
    
    const start = Date.now();

    try
    {
        
        defaultLimit = newdefaultLimit;
    
    } catch (error) {
        
        const end = Date.now();

        throw new csv_queryable_Error(
            'setLimit'
            , `${(end - start)}ms.`
            , error.message);

    }
}

memorize = function(csvFile, csvDelimiter = ',', ignoreEmptyRows = true) {    

    const start = Date.now();

    try
    {
        
        const expression = `(".*?"|[^"${csvDelimiter}]+)(?=\\s*${csvDelimiter}|\\s*$)`;
        const regex = new RegExp(expression, 'g');
    
        const csvLines = csvFile =>
        fs
        .readFileSync(csvFile)
        .toString('UTF8')
        .split('\n')
        .filter(function (el) {
            if (ignoreEmptyRows) {
                return el.trim();
            } else {
                return el;
            }
        })
        .map(function (row) {
            /**
             * 1 > remove carriage return line feed
             * 2 > apply regex
             * 3 > return empty array if not match
             */        
            return row.replace(/[\r\n]/gm, '').match(regex) || [];
        });
        
        const end = Date.now();

        let csvrows = csvLines(csvFile);

        //bidimensional array check to find bad formatting csv
        if (!Number.isInteger(csvrows.flat().length/csvrows.length)
            || csvrows.flat().length === csvrows.length)
        {

            const end = Date.now();

            throw new csv_queryable_Error(
                'memorize'
                , `${(end - start)}ms.`
                , "The csv file has not passed formal validation!");
                
        }

        return csvrows;

    } catch (error) {
        
        const end = Date.now();

        throw new csv_queryable_Error(
            'memorize'
            , `${(end - start)}ms.`
            , error.message);

    }
}

select = function(csvArray, header = [], columns = header, where = [], limit = defaultLimit) {

    const start = Date.now();

    try
    {
        
        if (header.length == 0) {
            header = csvArray[0];
            columns = columns.length > 0 ? columns : header;
        }
    
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
        csvArray = csvArray.map(r => columns.map(i => r[header.indexOf(i)]))
        .slice(limit[0], limit[1]);
    
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

        throw new csv_queryable_Error(
            'select'
            , `${(end - start)}ms.`
            , error.message);

    }
}

csv_queryable_Error = function(routine = "", executiontime = "", message = "") { 
    this.routine = routine;
    this.executiontime = executiontime; 
    this.message = message; 
    this.name = "csv_queryable_Error"; 
} 
csv_queryable_Error.prototype = Error.prototype;

module.exports = { itWorks, memorize, select, setLimit, getLimit };
