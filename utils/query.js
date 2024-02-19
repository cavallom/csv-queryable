class query {
    //constructor(columns = new Array(), table, where = new Array(), limit = new Array()) {
    constructor(columns, table, where, limit) {
      // values is now an HSL array!
      this.values = new Array(columns, table, where, limit);
    }
    select() {
      return this.values[0]
      + this.values[1]
      + this.values[2].replace('=', '==').replace('AND', '&&').replace('OR', '||')
      + this.values[3];
    }
    setRed(value) {
      this.values[0] = value;
    }
}

module.exports = { query };
