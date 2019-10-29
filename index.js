class zapfilter {
	constructor(dataSet, filters) {
		this.filters = filters || [];
		this.filteredSet = dataSet || [];
		this.filterORBuffer = [];
	}
	getAllFilters() {
		return this.filters;
	}
	getTotalFilters() {
		return this.filters.length;
	}
	applyFilters(filters) {
		filters.forEach(f => {
			return this.filters.push(f);
		});
		return;
	}
	clearFilters() {
		this.filterORBuffer = [];
		this.filteredSet = [];
		return (this.filters = []);
	}
	applySingleFilter(x, f) {
		return f.filter(x, f.onProperty, f.condition);
	}
	applyZapFilters(x, f) {
		return (x = this.applySingleFilter(x, f));
	}
	applyORFilters(i, x, f) {
		// Used with this.filterOR(..)
		return (this.filterORBuffer[i] = this.applySingleFilter(x, f));
	}
	combineResultsAndRemoveDuplicates(combinedDataSet) {
		const buffer = combinedDataSet;
		const isolateUniques = buffer.filter((value, index) => buffer.indexOf(value) === index);
		return isolateUniques;
	}
	filter(dataSet) {
		//Missing data set
		if (!dataSet) {
			throw new Error('ZapFilter error ===> No data set supplied!');
		}
		//Filter the data
		this.filteredSet = dataSet;
		//Filter the result
		for (var i = 0; i < this.filters.length; i++) {
			this.filteredSet = this.applyZapFilters(this.filteredSet, this.filters[i]);
		}
		//Return the response
		return this.filteredSet;
	}
	filterOR(dataSet) {
		//Missing data set
		if (!dataSet) {
			throw new Error('ZapFilter error ===> No data set supplied!');
		}
		//Filter the data
		this.filteredSet = dataSet;
		//Filter the result
		for (var i = 0; i < this.filters.length; i++) {
			this.applyORFilters(i, this.filteredSet, this.filters[i]);
		}
		//Return the response
		let flattenedResultsWithPotentialDuplicates = this.filterORBuffer.flat();
		return this.combineResultsAndRemoveDuplicates(flattenedResultsWithPotentialDuplicates);
	}
	filterLessThan(data, property, value) {
		return data.filter(item => item[property] < value);
	}
	filterGreaterThan(data, property, value) {
		return data.filter(item => item[property] > value);
	}
	filterEqualTo(data, property, value) {
		return data.filter(item => {
			if (typeof item[property] === 'string') {
				return (
					item[property].toUpperCase().replace(/\s|\_|\-/g, '') ===
					value.toUpperCase().replace(/\s|\_|\-/g, '')
				);
			}
			return item[property] === value;
		});
	}
	filterPartialMatch(data, property, value) {
		return data.filter(item => {
			if (typeof item[property] !== 'string') {
				throw new Error(
					'ZapFilter error ===> filterPartialMatch function must validate string value!'
				);
			}
			//Parse value to uppercase and remove spaces, dashes and underscores.
			let v = value.toUpperCase().replace(/\s|\_|\-/g, '');
			return RegExp(v, 'g').test(item[property].toUpperCase().replace(/\s|\_|\-/g, ''));
		});
	}
	filterNotEqualTo(data, property, value) {
		return data.filter(item => {
			if (typeof item[property] === 'string') {
				return (
					item[property].toUpperCase().replace(/\s|\_|\-/g, '') !==
					value.toUpperCase().replace(/\s|\_|\-/g, '')
				);
			}
			return item[property] !== value;
		});
	}
	filterBeforeDate(data, property, value) {
		const conditionDate = new Date(value);
		return data.filter(item => new Date(item[property]) < conditionDate);
	}
	filterAfterDate(data, property, value) {
		const conditionDate = new Date(value);
		return data.filter(item => new Date(item[property]) > conditionDate);
	}
	filterEqualToDate(data, property, value) {
		const conditionDate = new Date(value);
		return data.filter(item => new Date(item[property]) === conditionDate);
	}
	filterNotEqualToDate(data, property, value) {
		const conditionDate = new Date(value);
		return data.filter(item => new Date(item[property]) !== conditionDate);
	}
	removeDuplicates(dataSet) {
		const flatData = dataSet.flat();
		return this.combineResultsAndRemoveDuplicates(flatData);
	}
}
module.exports = zapfilter;
