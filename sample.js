const zapfilter = require("@interstellarjay/multifilter");
const zf = new zapfilter();
/**
 * Filter any JSON with multiple filters in 5 easy steps
 */
const dataSet = [
	{
		name: "Nintendo® Switch",
		age: 2
	},
	{
		name: "PlayStation® 4",
		age: 6
	},
	{
		name: "PS4® Pro",
		age: 3
	}
];

/**
 *	1 . Instantiate a new zapfilter
 **/
const zf = new zapfilter();

/**
 *	2 . Write your filter functions like this
 **/
function filterLessThan(data, property, value) {
	return data.filter((item) => item[property] < value);
}
function filterGreaterThan(data, property, value) {
	return data.filter((item) => item[property] > value);
}

/**
 *	3 . Store your conditions in an array of objects like this
 **/
const filters = [
	{
		filter: filterLessThan,
		condition: 6,
		onProperty: "age"
	},
	{
		filter: filterGreaterThan,
		condition: 2,
		onProperty: "age"
	}
];

/**
 *	4 . Apply the filters
 **/
zf.applyFilters(filters);
const result = zf.filter(dataSet);
console.log(result); // [{ name: "PS4® Pro", age: 3 }]

/**
 *	5 . Clear the filters when no longer needed
 **/
zf.clearFilters();
