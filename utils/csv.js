class csv {
    
    constructor(csvPath, csvDelimiter, ignoreEmptyRows, csvArray = new Array(), header = new Array(), columns = new Array(), where = new Array(), limit = new Array()) {
      this.values = new Array(csvPath, csvDelimiter, ignoreEmptyRows, csvArray, header, columns, where, limit);
    }
    
    memorize() {

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
    select() {
      // map with filtering columns
      csvArray.map(r => header.map(i => r[header.indexOf(i)]));

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
      csvArray.map(r => columns.map(i => r[header.indexOf(i)])).slice(limit[0],limit[1]);

      const csvArrayToJson = (rows) => {  
          return rows.reduce((jsonArray, row) => {
            const item = row.reduce((item, value, index) => {
              return {...item, [columns[index]]: value};
            }, {});
            return jsonArray.concat(item);
          }, []);
      };
        
      const csvJsonArray = csvArrayToJson(csvArray, ';');
        
      return JSON.stringify(csvJsonArray);
    }
}

module.exports = { csv };
