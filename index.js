/*
    ZapFilter powerful filtering and sorting tools < 20KB with zero dependencies.
    NPM package by @interstellarjay
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    HOW TO USE: 
    
    // Create new instance
    const zf = new zapfilter()
    
    // Get some data
    const dataToFilter = [
        { name: 'Audi Etron', preowned: 'no', price: '52999' },
        { name: 'Tesla Model S (2015)', preowned: 'yes',price: '39995' },
        { name: 'BMW i8', preowned: 'no', preowned: '35120' },
    ]
    
    // Make some filters using the preset zf functions
    const filters = [ 
      { 
        filter:  zf.filterEqualTo, 
        onProperty: 'preowned',  
        value: 'no' 
      },
      { 
        filter:  zf.filterLessThan, 
        onProperty: 'price',  
        value: '32999' 
      },
    ]
    
    // Set the filters
    zf.setFilters(filters)
    
    // Filter the data (default is set to either or)
    zf.filter(dataToFilter)
    
    // Clear the filters
    zf.clearFilters()
*/


class zapfilter {
    constructor(dataSet, filters) {
      this.filters = filters || []
      this.filteredSet = dataSet || []
      this.filterORBuffer = dataSet || []
    }
  
    getAllFilters() {
      return this.filters
    }
  
    getTotalFilters() {
      return this.filters.length
    }
  
    setFilters(filters) {
      return filters.forEach(f => this.filters.push(f))
    }
  
    clearFilters() {
      this.filterORBuffer = []
      this.filteredSet = []
      return (this.filters = [])
    }
  
    applySingleFilter(x, f) {
      return f.filter(x, f.onProperty, f.value)
    }
  
    applyZapFilters(x, f) {
      return (x = this.applySingleFilter(x, f))
    }
  
    applyORFilters(i, x, f) {
      // Used with this.filterOR(..)
      return (this.filterORBuffer[i] = this.applySingleFilter(x, f))
    }
  
    combineResultsAndRemoveDuplicates(combinedDataSet) {
      const buffer = combinedDataSet
      const isolateUniques = buffer.filter(
        (value, index) => buffer.indexOf(value) === index
      )
      const isolateUniquesFlat = isolateUniques.map(x => x[0])
      return isolateUniquesFlat
    }
  
    filterAND(dataSet) {
      // Missing data set
      if (!dataSet) {
        throw new Error('ZapFilter error ===> No data set supplied!')
      }
      // Filter the data
      this.filteredSet = dataSet
      // Filter the result
      for (let i = 0; i < this.filters.length; i++) {
        this.filteredSet = this.applyZapFilters(
          this.filteredSet,
          this.filters[i]
        )
      }
      // Return the response
      return this.filteredSet
    }
  
    filter(dataSet) {
      // Missing data set
      if (!dataSet) {
        throw new Error('ZapFilter error ===> No data set supplied!')
      }
      // Filter the data
      this.filteredSet = dataSet
      // Filter the result
      for (let i = 0; i < this.filters.length; i++) {
        this.applyORFilters(i, this.filteredSet, this.filters[i])
      }
      // Return the response
      const flattenedResultsWithPotentialDuplicates = this.filterORBuffer
      const results = this.combineResultsAndRemoveDuplicates(
        flattenedResultsWithPotentialDuplicates
      )
      return results
    }
  
    filterLessThan(data, property, value) {
      return data.filter(item => item[property] < value)
    }
  
    filterGreaterThan(data, property, value) {
      return data.filter(item => item[property] > value)
    }
  
    filterEqualTo(data, property, value) {
      return data.filter(item => {
        if (typeof item[property] === 'string') {
          return (
            item[property].toUpperCase().replace(/\s|\_|\-/g, '') ===
            value.toUpperCase().replace(/\s|\_|\-/g, '')
          )
        }
        return item[property] === value
      })
    }
  
    filterPartialMatch(data, property, value) {
      return data.filter(item => {
        if (typeof item[property] !== 'string') {
          throw new Error(
            'ZapFilter error ===> filterPartialMatch function must validate string value!'
          )
        }
        // Parse value to uppercase and remove spaces, dashes and underscores.
        const v = value.toUpperCase().replace(/\s|\_|\-/g, '')
        return RegExp(v, 'g').test(
          item[property].toUpperCase().replace(/\s|\_|\-/g, '')
        )
      })
    }
  
    filterNotEqualTo(data, property, value) {
      return data.filter(item => {
        if (typeof item[property] === 'string') {
          return (
            item[property].toUpperCase().replace(/\s|\_|\-/g, '') !==
            value.toUpperCase().replace(/\s|\_|\-/g, '')
          )
        }
        return item[property] !== value
      })
    }
  
    filterBeforeDate(data, property, value) {
      const conditionDate = new Date(value)
      return data.filter(item => new Date(item[property]) < conditionDate)
    }
  
    filterAfterDate(data, property, value) {
      const conditionDate = new Date(value)
      return data.filter(item => new Date(item[property]) > conditionDate)
    }
  
    filterEqualToDate(data, property, value) {
      const conditionDate = new Date(value)
      return data.filter(item => new Date(item[property]) === conditionDate)
    }
  
    filterNotEqualToDate(data, property, value) {
      const conditionDate = new Date(value)
      return data.filter(item => new Date(item[property]) !== conditionDate)
    }
  
    removeDuplicates(dataSet) {
      const flatData = dataSet.flat()
      return this.combineResultsAndRemoveDuplicates(flatData)
    }
  }
  
  module.exports = zapfilter
  
