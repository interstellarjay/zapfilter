const zapfilter = require('./index.js');
const zf = new zapfilter();
var dat = [{ name: 'Jay', age: 30 }, { name: 'Jenny', age: 31 }, { name: 'Chocolat', age: 2 }];
var filters = [
	{ filter: zf.filterNotEqualTo, onProperty: 'age', condition: 30 },
	{ filter: zf.filterPartialMatch, onProperty: 'name', condition: 'Choco' }
];
zf.applyFilters(filters);
var y = zf.filterOR(dat);
console.log(y);
zf.clearFilters();
