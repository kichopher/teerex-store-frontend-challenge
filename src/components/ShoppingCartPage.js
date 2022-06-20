import React from 'react'
import { Stack, Typography, Paper, Container, Alert, AlertTitle, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import ShoppingCartTotal from './ShoppingCartTotal'
import ShoppingCartItemsList from './ShoppingCartItemsList'

function ShoppingCartPage(props) {
  const {
    cartedProductDetails,
    getProductDetailsUsingProductId,
    cartQueries } = props
  const isCartEmtpy = (cartedProductDetails.length === 0)

  const getCartTotal = () => {
    let cartTotal = 0
    cartedProductDetails.forEach(cartedProductDetail => {
      const cartedProductQuantity = cartedProductDetail.cartedQuantity
      const productId = cartedProductDetail.productId
      const cartedProductPrice = getProductDetailsUsingProductId(productId).price
      cartTotal += (cartedProductQuantity * cartedProductPrice)
    })
    return cartTotal
  }

  let cartTotal = getCartTotal()


  return (
    <Container maxWidth="sm" sx={{ padding: 0, paddingBottom: 2 }}>
      <Stack
        alignItems="flex-start"
        justifyContent="flex-start"
        padding={2} spacing={1.5}
      >
        <Typography variant='h6' fontWeight="bold">Shopping Cart</Typography>
        {isCartEmtpy ?
          <Alert severity="info" sx={{ marginTop: 2, width: '100%' }}>
            <AlertTitle>Shopping cart is empty!</AlertTitle>
            <Link component={RouterLink} to="/" >
              Go to the products page
            </Link>
          </Alert>
          :
          <Paper variant="outlined" sx={{ padding: 2, paddingTop: 0, width: { xs: '100%', sm: 'auto' } }}>
            <ShoppingCartTotal cartTotal={cartTotal} />
            <ShoppingCartItemsList cartedProductDetails={cartedProductDetails}
              getProductDetailsUsingProductId={getProductDetailsUsingProductId}
              cartQueries={cartQueries} />
          </Paper>
        }
      </Stack>
    </Container>
  )
}

export default ShoppingCartPage
