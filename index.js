const chalk = require("chalk");
class zapfilter {
	constructor(dataSet, filters) {
		this.filters = filters || [];
		this.filteredSet = dataSet || [];
	}
	getAllFilters() {
		return this.filters;
	}
	getTotalFilters() {
		return this.filters.length;
	}
	applyFilters(filters) {
		filters.forEach((f) => {
			return this.filters.push(f);
		});
		return;
	}
	clearFilters() {
		return (this.filters = []);
	}
	applySingleFilter(x, f) {
		return f.filter(x, f.onProperty, f.condition);
	}
	applyZapFilters(x, f) {
		return (x = this.applySingleFilter(x, f));
	}
	filter(dataSet) {
		// Missing data set
		if (!dataSet) {
			throw new Error(chalk.yellow("ZapFilter error ===> No data set supplied!"));
		}
		// Filter the data
		let filterLength = this.filters.length - 1;
		this.filteredSet = dataSet;
		// Filter the result
		for (var i = 0; i < this.filters.length; i++) {
			this.filteredSet = this.applyZapFilters(this.filteredSet, this.filters[i]);
		}
		// Return the response
		return this.filteredSet;
	}
	filterLessThan(data, property, value) {
		return data.filter((item) => item[property] < value);
	}
	filterGreaterThan(data, property, value) {
		return data.filter((item) => item[property] > value);
	}
	filterEqualTo(data, property, value) {
		return data.filter(
			(item) =>
				item[property].toUpperCase().replace(/\s|\_|\-/g, "") ===
				value.toUpperCase().replace(/\s|\_|\-/g, "")
		);
	}
	filterNotEqualTo(data, property, value) {
		return data.filter(
			(item) =>
				item[property].toUpperCase().replace(/\s|\_|\-/g, "") !==
				value.toUpperCase().replace(/\s|\_|\-/g, "")
		);
	}
	filterBeforeDate(data, property, value) {
		const conditionDate = new Date(value);
		return data.filter((item) => new Date(item[property]) < conditionDate);
	}
	filterAfterDate(data, property, value) {
		const conditionDate = new Date(value);
		return data.filter((item) => new Date(item[property]) > conditionDate);
	}
	filterEqualToDate(data, property, value) {
		const conditionDate = new Date(value);
		return data.filter((item) => new Date(item[property]) === conditionDate);
	}
	filterNotEqualToDate(data, property, value) {
		const conditionDate = new Date(value);
		return data.filter((item) => new Date(item[property]) !== conditionDate);
	}
}
module.exports = zapfilter;
