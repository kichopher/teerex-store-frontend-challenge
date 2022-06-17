function createPriceFilterRanges(lowerBounds, currencySymbol) {
    //works well when there are atleast two lower bounds and the least value is the correct overall lower bound
    lowerBounds.sort((a, b) => a - b) //ensuring the values are in increasing order
    const priceRanges = []

    let currentLowerBoundIndex = 0
    while (currentLowerBoundIndex < lowerBounds.length - 1) { // less than n-1 because lower bound needs one value higher to create a valid bounded range
        const lowerBoundValue = lowerBounds[currentLowerBoundIndex]
        const upperBoundValue = lowerBounds[currentLowerBoundIndex + 1] - 1 //this is so that the current upperBoundValue is one less than the next lowerBound
        const newRange = `${currencySymbol}${lowerBoundValue} – ${currencySymbol}${upperBoundValue}`
        priceRanges.push(newRange)
        currentLowerBoundIndex++
    }
    if (lowerBounds.length === 0) lowerBounds.push(0);
    const unboundedFinalRange = `above ${currencySymbol}${lowerBounds[lowerBounds.length - 1]}`
    priceRanges.push(unboundedFinalRange)
    return priceRanges
}

const config = {
    productCatalogue_endpoint: `https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json`,
    currencySymbol: "Rs", //for Indian Rupees
    priceFilterRangeLowerBounds: [0, 251, 450], // these values will be used to create price filter ranges. 
    // Eg: given lower bounds [0, 251, 450], price ranges created would be "0 - 250", "251 - 499", "above 450" 
    productFilterGroups: [], //this array will be updated in the code below with valid array of objects containing filter data
}

const productFilterGroups = [
    {
        "filterCategory": "Colour",
        "filters": ["Red", "Blue", "Green"]
    },
    {
        "filterCategory": "Gender",
        "filters": ["Men", "Women"]
    },
    {
        "filterCategory": "Price",
        "filters": createPriceFilterRanges(config.priceFilterRangeLowerBounds, config.currencySymbol)
    },
    {
        "filterCategory": "Type",
        "filters": ["Polo", "Hoodie", "Basic"]
    }
]

config.productFilterGroups = productFilterGroups

export { config }


