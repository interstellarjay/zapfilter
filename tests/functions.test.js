import test from 'ava';
import zapfilter from '../index';

const zf = new zapfilter();
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
const filtersA = [
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

test('Filters using AND logic works correctly', t => {
	zf.applyFilters(filtersA);
	const result = zf.filter(dataSet);
	// Expected result
	const expected = [
		{
			name: 'Leo Kliesen',
			eyes: 'green',
			age: 19
		}
	];
	zf.clearFilters();
	// Assert result matches expected
	t.deepEqual(result, expected);
});

test('Filters using OR logic works correctly', t => {
	zf.applyFilters(filtersB);
	const result = zf.filterOR(dataSet);
	// Expected result
	const expected = [
		{ name: 'Julia', eyes: 'brown', age: 24 },
		{ name: 'Master Raven', eyes: 'brown', age: 36 },
		{ name: 'Leo Kliesen', eyes: 'green', age: 19 }
	];
	zf.clearFilters();
	// Assert result matches expected
	t.deepEqual(result, expected);
});
