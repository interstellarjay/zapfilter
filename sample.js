const zapfilter = require('./index.js');
const zf = new zapfilter();

/**
 * Filter any JSON with multiple filters in 5 easy steps
 */
const dataSet = [
	{
		name: 'Julia',
		eyes: 'brown',
		age: 24
	},
	{
		name: 'Master Raven',
		eyes: 'brown',
		age: 36
	},
	{
		name: 'Nina Williams',
		eyes: 'blue',
		age: 40
	},
	{
		name: 'Leo Kliesen',
		eyes: 'green',
		age: 19
	}
];
const filtersB = [
	{
		filter: zf.filterEqualTo,
		onProperty: 'eyes',
		condition: 'brown'
	},
	{
		filter: zf.filterPartialMatch,
		onProperty: 'name',
		condition: 'Leo'
	},
	{
		filter: zf.filterLessThan,
		onProperty: 'age',
		condition: 40
	}
];

/**
 *	1 . Instantiate a new zapfilter
 **/

/**
 *	2 . Write your filter functions like this
 **/
function filterLessThan(data, property, value) {
	return data.filter(item => item[property] < value);
}
function filterGreaterThan(data, property, value) {
	return data.filter(item => item[property] > value);
}

/**
 *	3 . Store your conditions in an array of objects like this
 **/
// const filters = [
// 	{
// 		filter: filterLessThan,
// 		condition: 6,
// 		onProperty: "age"
// 	},
// 	{
// 		filter: filterGreaterThan,
// 		condition: 2,
// 		onProperty: "age"
// 	}
// ];

/**
 *	4 . Apply the filters
 **/
zf.applyFilters(filtersB);
const result = zf.filterOR(dataSet);
console.log(result); // [{ name: "PS4® Pro", age: 3 }]

/**
 *	5 . Clear the filters when no longer needed
 **/
zf.clearFilters();
