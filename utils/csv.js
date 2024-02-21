class csv {
  // csvPath;
  // csvDelimiter;
  // ignoreEmptyRows;
  // csvArray;
  // header;
  // columns;
  // where;
  // limit;
  constructor(csvPath, csvDelimiter, ignoreEmptyRows, csvArray = new Array(), header = new Array(), columns = new Array(), where = new Array(), limit = new Array()) {
    this.csvPath = csvPath;
    this.csvDelimiter = csvDelimiter;
    this.ignoreEmptyRows = ignoreEmptyRows;
    this.csvArray = csvArray;
    this.header = header;
    this.columns = columns;
    this.where = where;
    this.limit = limit;
  }
    memorize = function() {    
      const fs = require('node:fs');
      const start = Date.now();
  
      try
      {
          const csvLines = csvPath =>
          fs
          .readFileSync(csvPath)
          .toString('UTF8')
          .split('\n')
          .filter(function (el, ignoreEmptyRows) {
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

          this.csvArray = csvLines(this.csvPath);

      } catch (error) {
          const end = Date.now();
          console.log("executiontime: " + `${(end - start)}ms.`);
          console.log(error.message)
      }
    }
    
    select = function() {
      // map with filtering columns
      this.csvArray.map(r => this.header.map(i => r[this.header.indexOf(i)]));

      this.where.forEach(element => {
        this.csvArray = this.csvArray.filter(function(e) {
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
      this.csvArray.map(r => this.columns.map(i => r[this.header.indexOf(i)])).slice(this.limit[0],this.limit[1]);

      const csvArrayToJson = (rows) => {  
          return rows.reduce((jsonArray, row) => {
            const item = row.reduce((item, value, index) => {
              return {...item, [this.columns[index]]: value};
            }, {});
            return jsonArray.concat(item);
          }, []);
      };
        
      const csvJsonArray = csvArrayToJson(this.csvArray, ';');
        
      return JSON.stringify(csvJsonArray);
    }
}

module.exports = { csv };
