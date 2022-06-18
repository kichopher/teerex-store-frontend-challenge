import React from 'react'
import { Stack, Typography, Paper, Container } from '@mui/material'
import ShoppingCartTotal from './ShoppingCartTotal'
import ShoppingCartItemsList from './ShoppingCartItemsList'

function ShoppingCartPage(props) {
  const { cartedProducts } = props
  let cartTotal = 699


  return (
    //Stack column, with alignItems="flex-start"
    //Stack contains 3 sections, 1st is the Shopping cart title
    //2nd is the carted items list where each item gets a card 
    //3rd is the cart total 
    <Container maxWidth="sm" sx={{padding:0, paddingBottom:2}}>
      <Stack
        alignItems="flex-start"
        justifyContent="flex-start"
        padding={2} spacing={1.5}
      >
        <Typography variant='h6' fontWeight="bold">Shopping Cart</Typography>
        <Paper variant="outlined" sx={{ padding: 2, paddingTop: 0, width: { xs: '100%', sm: 'auto' } }}>
          <ShoppingCartTotal cartTotal={cartTotal} />
          <ShoppingCartItemsList cartedProducts={cartedProducts} />
        </Paper>
      </Stack>
    </Container>
  )
}

export default ShoppingCartPage
