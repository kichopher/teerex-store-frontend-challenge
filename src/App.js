import React, { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import InvalidRouteErrorPage from './components/InvalidRouteErrorPage';
import NavBar from './components/NavBar';
import ProductsPage from './components/ProductsPage';
import ShoppingCartPage from './components/ShoppingCartPage';
import { config } from './config';
import axios from "axios"

function App() {
  const [allProducts, setAllProducts] = useState([])
  // const isAllProductsFetched = allProducts.length > 0
  const productsToDisplay = allProducts
  const cartedProducts = []
 //can keep a local variable called productsToDisplay that can be passed as prop to products page
 //productsToDisplay will be all the products that are to be shown after applying the search and filters
 //the filter and search functionalities can be implemented using callback functions that handles changes in search and filter
 
  const fetchAllProducts = async () => {
    try{
        const response = await axios.get(config.productCatalogue_endpoint)
        const data = response.data
        setAllProducts(data)
    }catch (error) {
        console.error(error)
    }
  }
  
  useEffect(() => {
    fetchAllProducts()
  }, [])

  return <>
    <NavBar />
    <Routes>
      <Route path="/" element={<ProductsPage productsToDisplay={productsToDisplay} />} />
      <Route path="/cart" element={<ShoppingCartPage />} />
      {/* Handling no match routes */}
      <Route path="*" element={<InvalidRouteErrorPage />} />
    </Routes>
  </>
}

export default App;
