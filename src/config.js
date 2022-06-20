const config = {
    productCatalogue_endpoint: `https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json`,
    currencySymbol: "Rs.", //for Indian Rupees
    priceFilterRangeStrings: [[0, 250], [251, 449], [450, Infinity]].map(range => range.toString()),
    //range tuple of the form [lowerLimit, upperLimit] will be converted to 'lowerLimit,upperLimit'
    //the string can be used as key inside an object and also the limits can be extracted wherever required.
    productFilterGroups: [], //this array will be updated in the code below with valid array of objects containing filter data
    filterSelectionStatusObject: {}, //this object will be updated in the code below
}

const productFilterGroups = [
    {
        "filterCategory": "Color",
        "filters": ["Red", "Blue", "Green"]
    },
    {
        "filterCategory": "Gender",
        "filters": ["Men", "Women"]
    },
    {
        "filterCategory": "Price",
        "filters": config.priceFilterRangeStrings
    },
    {
        "filterCategory": "Type",
        "filters": ["Polo", "Hoodie", "Basic"]
    }
]

config.productFilterGroups = productFilterGroups


const filterSelectionStatusObject = {}
//filterSelectionStatusObject allows for quick querying of selected/checked status of a filter
//access the checked status like so:
// filterSelectionStatusObject[filterCategory][filter] will have a Boolean value true || false
// it would all be initialized to false
config.productFilterGroups.forEach(filterGroupObject => {
    const { filters, filterCategory } = filterGroupObject
    const filterIsCheckedObject = {}
    filters.forEach(filter => filterIsCheckedObject[filter] = false)
    filterSelectionStatusObject[filterCategory] = filterIsCheckedObject
})

config.filterSelectionStatusObject = filterSelectionStatusObject


export { config }


