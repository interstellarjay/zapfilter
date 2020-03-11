import zapfilter from 'zapfilter'
const zf = new zapfilter()


const mockData = [
  {
    name: 'IBM (The International Business Machines Corporation)',
    founded: '1911-06-16',
    ceo: 'Virginia Marie Rometty',
    sexofceo: 'female',
    stock: 'IBM',
    service: 'Technology company',
    defunct: false,
  },
  {
    name: 'Microsoft Corporation',
    founded: '1975-04-04',
    ceo: 'Satya Nadella',
    sexofceo: 'male',
    stock: 'MSFT',
    service: 'Technology company',
    defunct: false,
  },
  {
    name: 'Google LLC',
    founded: '1998-09-04',
    ceo: 'Sundar Pichai',
    sexofceo: 'male',
    stock: 'GOOGL',
    service: 'Technology company',
    defunct: false,
  },
  {
    name: 'Astoria Bank (Astoria Financial Corporation)',
    founded: '1888-01-01',
    ceo: 'Satya Nadella',
    sexofceo: 'male',
    stock: 'AF',
    service: 'Financial services',
    defunct: true,
  },
]

describe('Utils for batch filtering', () => {
  it('filters all content by logical OR', () => {
    let filters = [
      {
        filter: zf.filterEqualTo,
        onProperty: 'service',
        value: 'Financial services',
      },
      {
        filter: zf.filterEqualTo,
        onProperty: 'service',
        value: 'Hypermarket retail',
      },
    ]
    zf.setFilters(filters)
    const result = zf.filter(mockData)
    zf.clearFilters()
    expect(result).toEqual([
      {
        name: 'Astoria Bank (Astoria Financial Corporation)',
        founded: '1888-01-01',
        ceo: 'Satya Nadella',
        sexofceo: 'male',
        stock: 'AF',
        service: 'Financial services',
        defunct: true,
      },
    ])
  })
  it('filters all content by logical AND', () => {
    let filters = [
      {
        filter: zf.filterBeforeDate,
        onProperty: 'founded',
        value: '1900-01-01',
      },
      {
        filter: zf.filterEqualTo,
        onProperty: 'sexofceo',
        value: 'female',
      },
    ]
    zf.setFilters(filters)
    const result = zf.filterAND(mockData)
    zf.clearFilters()
    expect(result).toStrictEqual([])
  })
  it('filters all content by greater than date', () => {
    let filters = [
      {
        filter: zf.filterAfterDate,
        onProperty: 'founded',
        value: '1990-01-01',
      },
    ]
    zf.setFilters(filters)
    const result = zf.filter(mockData)
    zf.clearFilters()
    expect(result).toEqual([
      {
        name: 'Google LLC',
        founded: '1998-09-04',
        ceo: 'Sundar Pichai',
        sexofceo: 'male',
        stock: 'GOOGL',
        service: 'Technology company',
        defunct: false,
      },
    ])
  })
  it('filters all content by combination of date and boolean value', () => {
    let filters = [
      {
        filter: zf.filterBeforeDate,
        onProperty: 'founded',
        value: '1930-01-01',
      },
      {
        filter: zf.filterEqualTo,
        onProperty: 'defunct',
        value: false,
      },
    ]
    zf.setFilters(filters)
    const result = zf.filterAND(mockData)
    zf.clearFilters()
    expect(result).toEqual([
        {
            name: 'IBM (The International Business Machines Corporation)',
            founded: '1911-06-16',
            ceo: 'Virginia Marie Rometty',
            sexofceo: 'female',
            stock: 'IBM',
            service: 'Technology company',
            defunct: false,
        },
    ])
  })
  it('filters are properly reset', () => {
    let filters = [
      {
        filter: zf.filterNotEqualTo,
        onProperty: 'service',
        value: 'Financial services',
      },
      {
        filter: zf.filterEqualTo,
        onProperty: 'sexofceo',
        value: 'female',
      },
    ]
    zf.setFilters(filters)
    const result = zf.filterAND(mockData)
    zf.clearFilters()
    expect(zf.getTotalFilters()).toEqual(0)
  })
})
