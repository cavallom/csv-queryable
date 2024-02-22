# csv-queryable

The creation of this package written in **JavaScript** comes from the need to create a simple and fast csv parser capable of managing millions of records and without any dependency on other packages. **csv-queryable** works in read-only mode with output in json format. It is designed for integration into massive data exchange operations or even as an on-the-fly data container for front-end interfaces, including web ones. The data can be updated at any time by reloading it from the original **CSV** source and multiple files can be loaded in the same work session.

- [csv-queryable](#csv-queryable)
  - [Installation](#installation)
    - [Package check](#package-check)
  - [Usage](#usage)
    - [memorize](#memorize)
    - [select](#select)
      - [Select syntax examples](#select-syntax-examples)
  - [Performance considerations](#performance-considerations)
  - [Comma-Separated Values (CSV)](#comma-separated-values-csv)
  - [License](#license)

## Installation

You can install this package via npm.

```bash
npm i csv-queryable
```

### Package check

Just to check the success of the installation, also returns basic package information.

| Param | Type | Description |
| ----- | ---- | ----------- |
|  |  | No parameters are required |

```bash
const csvqueryable = require('csv-queryable');
console.log(csvqueryable.itWorks());

#output : { json } > {
#    "itWorks": "Yes, it works!",
#    "package": "csv-queryable",
#    "version": "1.0.1"
#}
```

## Usage

### memorize

Loads a CSV file into memory and prepares it for query execution. If the file is not formally correct the function returns an error message. Please refer to the RCF 4180 directives which document the format used for Comma-Separated Values ​​(CSV) of the associated MIME type "text/csv". Below is the link to the csv specifications: [Comma-Separated Values (CSV)](#comma-separated-values-csv)

| Param | Type | Description |
| ----- | ---- | ----------- |
| csvFile | string | Path to local CSV file |
| csvDelimiter | string | The CSV delimiter character, not mandatory. Default value = ',' |
| ignoreEmptyRows | bool | Non-mandatory parameter to handle the blank line at the end of the file. Default value = true |

```bash
# call example
# package inclusion
const csvqueryable = require("csv-queryable");
# definition of parameters
const csvFile = 'path-to-local-csv-file';
const csvDelimiter = ','
const ignoreEmptyRows = true;
# call to the csv file reading function
let load = csvqueryable.memorize(csvFile, csvDelimiter, ignoreEmptyRows);

#output : queryable csv array
```

### select

With the **select** function it is possible to filter and extract the loaded csv data. Further on in the section [Select syntax examples](#select-syntax-examples) some examples of conditional extraction with the explanation of the syntax. The output, even when reading millions of records, is very fast and immediate.

| Param | Type | Description |
| ----- | ---- | ----------- |
| csvArray | Array[][] | A queryable csv array loaded with the **memorize** function |
| header | Array of strings | Defines the column names of the csv file |
| columns | Array of strings | Defines the columns that will be returned by the query |
| where | Array of strings | Defines the data extraction rules that will be used by the query |
| limit | Array of integer | Used as in SQL queries to limit row extraction |

```bash
# call example
# package inclusion
const csvqueryable = require("csv-queryable");
# definition of the parameters for loading the csv file into memory
const csvFile = 'path-to-local-csv-file';
const csvDelimiter = ','
const ignoreEmptyRows = true;
# call to the csv file loading function
let load = csvqueryable.memorize(csvFile, csvDelimiter, ignoreEmptyRows);
# definition of parameters for data extraction
const header = new Array("Index","Organization Id","Name","Website","Country","Description","Founded");
const columns = new Array("Name","Website","Country","Founded");
const where = new Array(["Country","%%","Swe"],["Founded","!=","2016"]);
const limit = new Array(0,2);
# function call to extract data using the previous load
let output = csvqueryable.select(load, header, columns, where, limit);

#output { json } > [
#    {
#        "Name": "Barry-Holloway",
#        "Website": "https://www.spears.com/",
#        "Country": "Sweden",
#        "Founded": "1992"
#    },
#    {
#        "Name": "\"Howe, Figueroa and Schaefer\"",
#        "Website": "http://www.chase.biz/",
#        "Country": "Sweden",
#        "Founded": "2009"
#    }
#]
```

#### Select syntax examples

At the moment **csv-queryable** uses three custom comparison operators: **==** as equals, **!=** as different, **%%** as like. To optimize and speed up data extraction, **where** conditions are applied sequentially in concentric sets. This is why the sorting in the array of **where** conditions determines the result of the query. Even fields that will not be extracted can be included in **where** conditions. It depends on the need of the query whether to start from the smallest or largest set. The **limit** parameter works as **.slice()** so returns **start** to **end** (end not included) where start and end represent the index of items in the query result.

```bash
# Parameters translated into SQL logic
# SELECT Name, Website, Country, Founded
const columns = new Array("Name","Website","Country","Founded");
# WHERE Country LIKE %Swe% INNER JOIN Founded != 2016
const where = new Array(["Country","%%","Swe"],["Founded","!=","2016"]);
# LIMIT 0, 2
const limit = new Array(0,2);

#output { json } > [
#    {
#        "Name": "Barry-Holloway",
#        "Website": "https://www.spears.com/",
#        "Country": "Sweden",
#        "Founded": "1992"
#    },
#    {
#        "Name": "\"Howe, Figueroa and Schaefer\"",
#        "Website": "http://www.chase.biz/",
#        "Country": "Sweden",
#        "Founded": "2009"
#    }
#]
```

## Performance considerations

**csv-queryable** is designed and tested to quickly load and navigate even large csv files with millions of rows and many columns. For even better performance, we recommend loading the csv files at the start of the work session, thus making them available for multiple queries.

## Comma-Separated Values (CSV)

[RCF 4180 directives](https://www.rfc-editor.org/rfc/rfc4180.html)

## License

[MIT](https://opensource.org/blog/license/mit)
