import React, { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import { Snackbar, Alert } from '@mui/material';
import InvalidRouteErrorPage from './components/InvalidRouteErrorPage';
import NavBar from './components/NavBar';
import ProductsPage from './components/ProductsPage';
import ShoppingCartPage from './components/ShoppingCartPage';
import { config } from './config';
import axios from "axios"

function App() {
  const [allProducts, setAllProducts] = useState([])
  const [cartedProductDetails, setCartedProductDetails] = useState([]) //[{productId, cartedQuantity}]
  const [showQuantityErrorSnackbar, setShowQuantityErrorSnackbar] = useState(false)

  const handleQuantityErrorSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setShowQuantityErrorSnackbar(false)
  }

  const getProductDetailsUsingProductId = (productId) => {
    //returns matching productObject. If no match returns undefined.
    return allProducts.find(productObject => {
      return productObject.id === productId
    })
  }

  const getCartedProductDetailObject = (productId) => {
    return cartedProductDetails.find(cartItemObject => {
      return cartItemObject.productId === productId
    })
  }

  const isProductCartQuantityAvailable = (productId, requiredCartQuantity) => {
    const productObject = getProductDetailsUsingProductId(productId)
    return (productObject.quantity >= requiredCartQuantity)
  }

  const addNewCartItem = (productId) => {
    //first check if quantity available is atleast one
    const isProductAvailable = isProductCartQuantityAvailable(productId, 1)
    if (isProductAvailable) {
      const copyOfCartedProductDetails = [...cartedProductDetails]
      const newCartItem = { productId, cartedQuantity: 1 }
      copyOfCartedProductDetails.push(newCartItem)
      setCartedProductDetails(copyOfCartedProductDetails)
    } else {
      setShowQuantityErrorSnackbar(true)
    }
  }

  const removeItemFromCart = (productId) => {
    const copyOfCartedProductDetailsWithProductRemoved = cartedProductDetails.filter(cartItem => {
      return (cartItem.productId !== productId)
    })
    setCartedProductDetails(copyOfCartedProductDetailsWithProductRemoved)
  }

  const isProductInCart = (productId) => {
    const cartedItemObject = getCartedProductDetailObject(productId)
    return (cartedItemObject === undefined ? false : true)
  }

  const getCartedProductQuantity = (productId) => {
    const cartedItemObject = getCartedProductDetailObject(productId)
    return cartedItemObject?.cartedQuantity
  }

  const updateCartedProductQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItemFromCart(productId)
    }
    else {
      //check if updateQuantity is available
      if (isProductCartQuantityAvailable(productId, newQuantity)) {
        const copyOfCartedProductDetails = [...cartedProductDetails]
        //update quantity in correct array item and setCartedProductDetails array
        for (let i = 0; i < copyOfCartedProductDetails.length; i++) {
          if (copyOfCartedProductDetails[i].productId === productId) {
            copyOfCartedProductDetails[i].cartedQuantity = newQuantity
          }
        }
        setCartedProductDetails(copyOfCartedProductDetails)
      } else {
        setShowQuantityErrorSnackbar(true)
      }
    }
  }


  const cartQueries = {
    isProductInCart,
    getCartedProductQuantity,
    updateCartedProductQuantity,
    addNewCartItem,
    removeItemFromCart
  }

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(config.productCatalogue_endpoint)
      const data = response.data
      setAllProducts(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    localStorage.setItem('cartedProductDetails', JSON.stringify(cartedProductDetails))
  }, [cartedProductDetails])

  useEffect(() => {
    fetchAllProducts()
    let cartedProductDetailsFromLocalStorage = JSON.parse(localStorage.getItem('cartedProductDetails'))
    if (cartedProductDetailsFromLocalStorage) {
      setCartedProductDetails(cartedProductDetailsFromLocalStorage)
    }
  }, [])

  return <>
    <NavBar cartItemCount={cartedProductDetails.length} />

    <Routes>
      <Route path="/" element={<ProductsPage allProducts={allProducts} cartQueries={cartQueries} />} />
      <Route path="/cart"
        element={<ShoppingCartPage
          cartedProductDetails={cartedProductDetails}
          getProductDetailsUsingProductId={getProductDetailsUsingProductId}
          cartQueries={cartQueries}
        />}
      />

      {/* Handling no match routes */}
      <Route path="*" element={<InvalidRouteErrorPage />} />
    </Routes>

    <Snackbar open={showQuantityErrorSnackbar} autoHideDuration={4000}
      onClose={handleQuantityErrorSnackbarClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert variant="filled" severity="warning">
        Product quantity unavailable!
      </Alert>
    </Snackbar>
  </>
}

export default App;