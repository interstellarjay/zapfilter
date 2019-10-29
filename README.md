# :zap: zapfilter 
This project was previously found at @interstellarjay/multifilter.

## What is zapfilter?

This is a open-source, free, library to apply multiple filters on JSON data. The library is designed to be <em>lightweight</em>, <em>extensible</em> and <em>easy to use</em>. 

From version `1.2.5` you can filter by either AND and OR.

You can use this library to filter on combinations of:
+ Dates
+ Strings
+ Numbers
+ Booleans

Written with love in JS by @interstellarjay. 


---

## How do I use zapfilter?

Install the module from `npm`

```bash
npm i zapfilter
```

Create a new zapfilter instance

```javascript
const zapfilter = require("zapfilter"); // import zapfilter from "zapfilter"
const zf = new zapfilter();
```

Fetch your JSON data

```javascript
const dataSet = [
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
];
```

List your filters as shown below, <a href="#helperFuncs">you can use the preset filters in zapfilter</a> or write your own filter functions. Don't use parentheses `()`.

```javascript
/**
 *	Store your conditions in an array of objects like this..
 *	-> filter takes a function (see zapfilter helper functions)
 *	-> onProperty is the key in the object to use to validate.
 *	-> condition is the value that to use to validate.
 **/
let filters = [
	{
		filter: zf.filterEqualTo,
		onProperty: "age",
		condition: 3,
	},
	{
		filter: zf.filterGreaterThan,
		onProperty: "price",
		condition: 250.00,
	}
];
```

Apply the filters

```javascript
zf.applyFilters(filters);
```

Filter the JSON data with the applied filters

### v1.2.5+ `.filter(data)` Logical AND (the results must fulfil all filter criteria)
```javascript
const result = zf.filter(dataSet);
console.log(result); 
// [
//	{ 
//		name: "PS4® Pro", 
//		age: 3 
//	}
// ]
```

### v.1.2.5+ `filterOR(data)` Logical OR (the results can match any filter criteria)
```javascript
const result = zf.filterOR(dataSet);
console.log(result); 
// [
//	{ 
//		name: "PS4® Pro", 
//		age: 3 
//	}
//	{
//		name: "Nintendo® Switch",
//		price: 289.99,
//		currency: "EUR",
//		age: 2
//	},
// ]

```


Clear the filters when you no longer need them.

```javascript
zf.clearFilters();
```


---

<h1>:zap: zapfilter API</h1>

### Creating filters

In zapfilter each filter is written in the following format.

```javascript
{
	filter: FILTER_FUNCTION,
	onProperty: KEY_IN_EACH_OBJECT,
	condition: VALIDATE_AGAINST_THIS_VALUE
}
```

Then store all the filters you would like to apply in an array.
```javascript
let filters = [
	{
		filter: zf.filterLessThan,
		onProperty: "age"
		condition: 6,
	},
	{
		filter: zf.filterGreaterThan,
		onProperty: "age"
		condition: 2,
	}
];
```

---

### zf.applyFilters `(Array of filters)`
Registers all the filters to be used before the data is filtered.

`zf.applyFilters(filters)`

---

### zf.clearFilters `()`
Removes all the applied filters, your data will now be unfiltered.

`zf.clearFilters()`

---

### zf.filterOR `(JSON)` :ab:
 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators/#Description">Logical OR filtering.</a>

Filters the JSON and returns results if **any** of the filter criteria are true after calling `zf.applyFilters(filters)` function. Returns JSON of filtered data.

`zf.filterOR(JSON)`
---

### zf.filter `(JSON)` :a: :b:
:hand: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_Operators/#Description">Logical AND filtering.</a>

Filters the JSON and returns results when **ALL** of the filter criteria are true after calling `zf.applyFilters(filters)` function. Returns JSON of filtered data.

`zf.filter(JSON)`

---

<h2 id="helperFuncs">zapfilter functions API</h2>

zapfilter comes with helper filter functions for testing against numbers, strings and booleans.


### zf.filterLessThan `Number`

Filter everything `< 70` from the `weightKG` key of every object in the JSON.

```javascript
{
	filter: zf.filterLessThan,
	onProperty: "weightKG",
	condition: 100
}
```
---
### zf.filterGreaterThan `Number`

Filter everything `> 20` from the `likes` key of every object in the JSON.

```javascript
{
	filter: zf.filterGreaterThan,
	onProperty: "likes",
	condition: 20
}
```
---
### zf.filterEqualTo `Number, String, Boolean`
##### :hand: By default `"-"`, and `"_"`, and `" "` are escaped from strings. And matches are case insensitive.

Filter everything EXACTLY equal to `"PlayStation"` from the `brand` key of every object in the JSON.

```javascript
{
	filter: zf.filterEqualTo,
	onProperty: "brand",
	condition: "PlayStation"
}
```
---

### zf.filterPartialMatch `String` 
##### :hand: By default `"-"`, and `"_"`, and `" "` are escaped from strings. And matches are case insensitive.
Filter everything which partially contains the specified string specified.

```javascript
{
	filter: zf.filterPartialMatch,
	onProperty: "brand",
	condition: "play"
}
```

---
### zf.filterNotEqualTo `Number, String, Boolean`
##### :hand: By default `"-"`, and `"_"`, and `" "` are escaped from strings.

Filter everything not equal to `"God of War"` from the `title` key of every object in the JSON.

```javascript
{
	filter: zf.filterNotEqualTo,
	onProperty: "title",
	condition: "God of War"
}
```
---
### zf.filterBeforeDate `String` as `"YYYY-MM-DD"`

Filter everything before `October 5th 2019` from the `launchdate` key of every object in the JSON.

```javascript
{
	filter: zf.filterBeforeDate,
	onProperty: "launchdate",
	condition: "2019-10-05",
}
```
---
### zf.filterAfterDate `String` as `"YYYY-MM-DD"`

Filter everything after `June 25th 2020` from the `bookingdate` key of every object in the JSON.

```javascript
{
	filter: zf.filterAfterDate,
	onProperty: "bookingdate",
	condition: "2020-06-25"
}
```
---
### zf.filterEqualToDate `String` as `"YYYY-MM-DD"`

Filter everything equal to `February 28th 2020` from the `departuredate` key of every object in the JSON.

```javascript
{
	filter: zf.filterEqualToDate,
	onProperty: "departuredate",
	condition: "2020-02-28",
}
```
---
### zf.filterNotEqualToDate `String` as `"YYYY-MM-DD"`

Filter everything not equal to `March 1st 2020` from the `returndate` key of every object in the JSON.

```javascript
{
	filter: zf.filterNotEqualToDate,
	onProperty: "returndate",
	condition: "2020-03-01"
}
```
---

## Where would I use this?
Filter your data set by name, release date, rating, color, price, age, condition... anything you like!

---

## Why create zapfilter?
zapfilter was created because I felt like the process of applying multiple filters on JSON needed to be simpler.

---

## Enjoying zapfilter?
If you're enjoying zapfilter and would like to support the project, please consider becoming a contributor.

---