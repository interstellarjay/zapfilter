# :zap: zapfilter 
## Batch filter large data sets.
Code by [@interstellarjay](https://github.com/interstellarjay/) :heart:

You can use this library to filter on combinations of:
+ Dates
+ Strings
+ Numbers
+ Booleans

Why use Zapfilter?
+ < 50KB.
+ No dependencies.
+ Open source.

---

## How do I use zapfilter?

**1** Install the module from `npm`

```bash
npm i zapfilter
```

**2** Create a new zapfilter instance

```javascript
const zapfilter = require("zapfilter"); // import zapfilter from "zapfilter"
const zf = new zapfilter();
```

**3** Fetch your JSON data

```javascript
const data = [
	{
		name: "Nintendo® Switch",
		price: 289.99,
		currency: "EUR",
		age: 2
	},
	{
		name: "PlayStation® 4",
		price: 229.99
		currency: "EUR",
		age: 6
	},
	{
		name: "PS4® Pro",
		price: 319.99,
		currency: "EUR",
		age: 3
	}
]
```

**4** Filter
Filters must be written in the format:
+ filter `filterfunction`,
+ onProperty: `name of key in data object `,
+ value: `the value you want to check against`

```javascript
const filters = [
	{
		filter: zf.filterEqualTo,
		onProperty: "age",
		value: 3,
	},
	{
		filter: zf.filterGreaterThan,
		onProperty: "price",
		value: 250.00,
	}
];
zf.setFilters(filters);
zf.filter(data);
zf.clearFilters();
```
---

## API - core functions
:hand: By default `"-"`, and `"_"`, and `" "` are escaped from strings. And matches are case insensitive.

`zf.setFilters(filters)`
- Registers all the filters to be used before the data is filtered.

`zf.filter(data)`
- Filters the data if any conditions match.

`zf.removeDuplicates()` 
- Manually remove any duplicated objects in the result.

`zf.clearFilters()`
- Removes all the applied filters, your data will now be unfiltered.

---

## API - prebuilt filter methods

`zf.filterLessThan`
- Filter everything less than the specified number.

`zf.filterGreaterThan`
- Filter everything greater than the specified number.

`zf.filterEqualTo` 
- Filter everything EXACTLY equal to the specified `number`, `boolean`, or `string`.

`zf.filterPartialMatch` 
- Filter everything which partially contains the specified string specified.

`zf.filterNotEqualTo`
- Filter everything NOT equal to the specified `number`, `boolean`, or `string`.

`zf.filterBeforeDate` (Dates written in the format `"YYYY-MM-DD"`).
- Filter everything before the specified date

`zf.filterBeforeDate` (Dates written in the format `"YYYY-MM-DD"`).
- Filter everything after the specified date

`zf.filterEqualToDate` (Dates written in the format `"YYYY-MM-DD"`).
- Filter everything equal to the specified date

`zf.filterNotEqualToDate` (Dates written in the format `"YYYY-MM-DD"`).
- Filter everything not equal to the specified date

---

## Where would I use this?
Filter your data set by name, release date, rating, color, price, age, condition... anything you like!

## Why create zapfilter?
zapfilter was created because I felt like the process of applying multiple filters on JSON needed to be simpler.

## Enjoying zapfilter?
If you're enjoying zapfilter and would like to support the project, please consider sponsoring the package.

---
