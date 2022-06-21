import React, { useState, useEffect, useCallback } from 'react'
import { Stack, Grid } from '@mui/material'
import ProductFiltersPanel from './ProductFiltersPanel'
import ProductsSearchBar from './ProductsSearchBar'
import ProductsGrid from './ProductsGrid'
import ProductFiltersButtonToShowFilterDialog from './ProductFiltersButtonToShowFilterDialog'
import { config } from '../config'


function ProductsPage(props) {
  const { allProducts, cartQueries } = props
  const [productsAfterSearch, setProductsAfterSearch] = useState([])
  const [productsToDisplay, setProductsToDisplay] = useState([])
  const [filterSelectionStatusObject, setFilterSelectionStatusObject] = useState(config.filterSelectionStatusObject)
  //filterSelectionStatusObject object allows for quick querying of selected/checked status of a filter
  //access the checked status like so:
  // filterSelectionStatusObject[filterCategory][filter] will have a Boolean value true || false
  // it would all be initialized to false
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false)
  const [searchFieldText, setSearchFieldText] = useState('')

  /****filterSelectionStatusObject state handler:****/
  const handleFilterCheckUncheck = (filterCategory, filter) => {
    const copyOfFilterSelectionStatusObject = { ...filterSelectionStatusObject }
    const copyOfFilterCategoryCheckedStatusObject = { ...copyOfFilterSelectionStatusObject[filterCategory] }
    const currentFilterCheckedStatus = copyOfFilterCategoryCheckedStatusObject[filter]
    //now toggle the checked status
    copyOfFilterCategoryCheckedStatusObject[filter] = !currentFilterCheckedStatus
    //now update the state
    copyOfFilterSelectionStatusObject[filterCategory] = copyOfFilterCategoryCheckedStatusObject
    setFilterSelectionStatusObject(copyOfFilterSelectionStatusObject)
  }

  /****isFitlerDialogOpen state handlers:****/
  const handleFilterDialogOpen = () => {
    setIsFilterDialogOpen(true)
  }
  const handleFilterDialogClose = () => {
    setIsFilterDialogOpen(false)
  }

  /****searchFieldText state handler:****/
  const handleSearchFieldTextChange = (newSearchFieldText) => {
    setSearchFieldText(newSearchFieldText)
  }

  /****Case insensitive search for string in array****/
  const wordFoundInArray = (keyword, array) => {
    //this function is a case-insensitive version of Array.prototype.includes()
    const found = array.find(arrayElement => {
      const regexForCaseInsensitiveMatch = new RegExp(`\\b${keyword.trim()}\\b`, "i") //case insensitive match
      return regexForCaseInsensitiveMatch.test(arrayElement)
    })
    return found
    //found is the matched arrayElement. If got no match, then found is undefined
  }

  /****filter implementation helper functions and productsToDisplay state handlers: ****/
  const isPriceInRangeGivenPriceRangeString = (priceRangeString, price) => {
    price = Number(price)
    const [lowerLimit, upperLimit] = priceRangeString.split(',').map(numberString => Number(numberString))
    return ((price >= lowerLimit) && (price <= upperLimit))
  }

  const parseFilterSelectionStatusObject = (filterSelectionStatusObject) => {
    const parsedFilterSelectionsObject = {
      selectedColorFilters: [],
      selectedTypeFilters: [],
      selectedPriceRangeFilters: [],
      selectedGenderFilters: []
    }
    for (const filterCategory in filterSelectionStatusObject) {
      const filterCategoryObject = filterSelectionStatusObject[filterCategory]

      for (const filter in filterCategoryObject) {
        const isFilterSelected = filterCategoryObject[filter]
        if (isFilterSelected) {
          //push this filter into the array corresponding to the appropriate property in parsedFilterSelectionsObject
          if (filterCategory.toLowerCase() === "Color".toLowerCase()) {
            parsedFilterSelectionsObject.selectedColorFilters.push(filter)
          }
          else if (filterCategory.toLowerCase() === "Type".toLowerCase()) {
            parsedFilterSelectionsObject.selectedTypeFilters.push(filter)
          }
          else if (filterCategory.toLowerCase() === "Price".toLowerCase()) {
            parsedFilterSelectionsObject.selectedPriceRangeFilters.push(filter)
          }
          else if (filterCategory.toLowerCase() === "Gender".toLowerCase()) {
            parsedFilterSelectionsObject.selectedGenderFilters.push(filter)
          }
        }
      }
    }
    return parsedFilterSelectionsObject
  }


  const applyFiltersAndSetProductsToDisplay = useCallback((productsToFilter, filterSelectionStatusObject) => {
    //first parse the filterSelectionStatusObject to segregate selected filters into bins
    //  such as selectedColorFilters, selectedTypeFilters, selectedPriceRangeFilters, selectedGenderFilters
    const parsedFilterSelectionsObject = parseFilterSelectionStatusObject(filterSelectionStatusObject)
    const {
      selectedColorFilters,
      selectedTypeFilters,
      selectedPriceRangeFilters,
      selectedGenderFilters } = parsedFilterSelectionsObject

    const productsThatMatchedFilters = productsToFilter.filter(productObject => {
      const {
        color: productColor,
        type: productType,
        price: productPrice,
        gender: productGender } = productObject
      let [
        hasSelectedColor,
        hasSelectedType,
        hasPriceWithinSelectedRange,
        hasSelectedGender] = [false, false, false, false]
      if (selectedColorFilters.length === 0) hasSelectedColor = true
      else {
        hasSelectedColor = Boolean(wordFoundInArray(productColor, selectedColorFilters))
      }
      if (selectedTypeFilters.length === 0) hasSelectedType = true
      else {
        hasSelectedType = Boolean(wordFoundInArray(productType, selectedTypeFilters))
      }
      if (selectedPriceRangeFilters.length === 0) hasPriceWithinSelectedRange = true
      else {
        hasPriceWithinSelectedRange = selectedPriceRangeFilters.some(priceRangeString => {
          return isPriceInRangeGivenPriceRangeString(priceRangeString, productPrice)
        })
      }
      if (selectedGenderFilters.length === 0) hasSelectedGender = true
      else {
        hasSelectedGender = Boolean(wordFoundInArray(productGender, selectedGenderFilters))
      }
      return (hasSelectedColor && hasSelectedType && hasPriceWithinSelectedRange && hasSelectedGender)
    })

    setProductsToDisplay(productsThatMatchedFilters)
  }, [])


  /****search implementation helpers and productsAfterSearch state handler:****/
  const getSearchedProducts = (productsToSearchFrom, searchKeyWords) => {
    const searchKeyWordHasMatchedSomeProductProperty = (searchKeyWord, productPropertiesToSearch) => {
      const regexToSearchKeyWordInProductProperty = new RegExp(`\\b${searchKeyWord}`, "i") //case insensitive word match without right boundary. "bl" matches words like "black", "blue"
      return productPropertiesToSearch.some(productProperty => {
        return regexToSearchKeyWordInProductProperty.test(productProperty)
      })
    }
    const productHasMatchOnNameOrColorOrType = (productObject, searchKeyWords) => {
      //return true if every searchKeyWord was matched by atleast one of the product properties color, type or name
      const {
        color: currentProductColor,
        type: currentProductType,
        name: currentProductName } = productObject
      const productPropertiesToSearch = [currentProductName, currentProductColor, currentProductType]
      return searchKeyWords.every((searchKeyWord) => {
        return searchKeyWordHasMatchedSomeProductProperty(searchKeyWord, productPropertiesToSearch)
      })
    }

    const searchedProducts = productsToSearchFrom.filter(productObject => {
      return productHasMatchOnNameOrColorOrType(productObject, searchKeyWords)
    })
    return searchedProducts
  }

  const handleSearch = (searchString) => {
    //if searchString is empty searchResult is allProducts
    // if searchString is non-empty, first create a list of search keywords
    // by splitting the string with space as delimiter
    // then get all products that has a string match of values on name, type or color
    searchString = searchString.trim()
    let searchResult = allProducts
    if (searchString !== "") {
      const searchKeyWords = searchString.split(' ').filter(keyword => keyword.trim().length !== 0)
      //splits all words with space as delimiter and removes blank space elements from resulting array
      searchResult = getSearchedProducts(allProducts, searchKeyWords)
    }
    setProductsAfterSearch(searchResult)
  }


  useEffect(() => {
    setProductsAfterSearch(allProducts)
  }, [allProducts])

  useEffect(() => {
    applyFiltersAndSetProductsToDisplay(productsAfterSearch, filterSelectionStatusObject)
  }, [productsAfterSearch, filterSelectionStatusObject, applyFiltersAndSetProductsToDisplay])


  return (
    <>
      <Grid container padding={2} spacing={2}>
        <Grid item sx={{ display: { xs: 'none', sm: 'flex' } }} sm={3} lg={2.5} xl={2}>
          <ProductFiltersPanel
            filterSelectionStatusObject={filterSelectionStatusObject} handleFilterCheckUncheck={handleFilterCheckUncheck}
          />
        </Grid>
        <Grid item xs={12} sm={9} lg={9.5} xl={10}>
          <Stack
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Stack
              direction="row"
              spacing={0.5}
            >
              <ProductsSearchBar
                searchFieldText={searchFieldText}
                handleSearchFieldTextChange={handleSearchFieldTextChange}
                handleSearch={handleSearch}
              />
              <ProductFiltersButtonToShowFilterDialog
                isFilterDialogOpen={isFilterDialogOpen}
                handleFilterDialogClose={handleFilterDialogClose} handleFilterDialogOpen={handleFilterDialogOpen}
              >
                <ProductFiltersPanel
                  hasDoneButton handleDoneButtonClick={handleFilterDialogClose}
                  filterSelectionStatusObject={filterSelectionStatusObject} handleFilterCheckUncheck={handleFilterCheckUncheck}
                />
              </ProductFiltersButtonToShowFilterDialog>
            </Stack>

            <ProductsGrid productsToDisplay={productsToDisplay} cartQueries={cartQueries}/>
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}

export default ProductsPage