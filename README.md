# :zap: zapfilter 
This project was previously found at @interstellarjay/multifilter.

## What is zapfilter?

This is a open-source, free, library to apply multiple filters on JSON data. The library is designed to be <em>lightweight</em>, <em>extensible</em> and <em>easy to use</em>. 

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
npm i -S zapfilter@latest
```

Create a new zapfilter instance

```javascript
const zapfilter = require("zapfilter");
const zf = new zapfilter();
```

Fetch your JSON data

```javascript
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

Apply the filters

```javascript
zf.applyFilters(filters);
```

Filter the JSON data with the applied filters

```javascript
const result = zf.filter(dataSet);
console.log(result); // [{ name: "PS4® Pro", age: 3 }]
```

Clear the filters when you no longer need them.

```javascript
zf.clearFilters();
```

---

<h1>zapfilter API</h1>
<h2>zapfilter core API</h2>

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

### zf.filter `(JSON)`
Filters the JSON with every filter from the `zf.applyFilters(filters)` function. Returns JSON of filtered data.

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
##### :warning: By default `"-"`, and `"_"`, and `" "` are escaped from strings.

Filter everything equal to `"PlayStation"` from the `brand` key of every object in the JSON.

```javascript
{
	filter: zf.filterGreaterThan,
	onProperty: "brand",
	condition: "PlayStation"
}
```
---
### zf.filterNotEqualTo `Number, String, Boolean`
##### :warning: By default `"-"`, and `"_"`, and `" "` are escaped from strings.

Filter everything not equal to `"God of War"` from the `title` key of every object in the JSON.

```javascript
{
	filter: zf.filterGreaterThan,
	onProperty: "title",
	condition: "God of War"
}
```
---
### zf.filterBeforeDate `String` as `"YYYY-MM-DD"`

Filter everything before `October 5th 2019` from the `launchdate` key of every object in the JSON.

```javascript
{
	filter: zf.filterGreaterThan,
	onProperty: "launchdate",
	condition: "2019-10-05",
}
```
---
### zf.filterAfterDate `String` as `"YYYY-MM-DD"`

Filter everything after `June 25th 2020` from the `bookingdate` key of every object in the JSON.

```javascript
{
	filter: zf.filterGreaterThan,
	onProperty: "bookingdate",
	condition: "2020-06-25"
}
```
---
### zf.filterEqualToDate `String` as `"YYYY-MM-DD"`

Filter everything equal to `February 28th 2020` from the `departuredate` key of every object in the JSON.

```javascript
{
	filter: zf.filterGreaterThan,
	onProperty: "departuredate",
	condition: "2020-02-18",
}
```
---
### zf.filterNotEqualToDate `String` as `"YYYY-MM-DD"`

Filter everything not equal to `March 3rd 2020` from the `returndate` key of every object in the JSON.

```javascript
{
	filter: zf.filterGreaterThan,
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