import React from 'react'
import { Paper, Stack, Box, Typography, Button } from '@mui/material'
import ShoppingCartItemQuantitySelection from './ShoppingCartItemQuantitySelection'
import { config } from '../config'

export default function ShoppingCartItemCard(props) {
    const { cartedProduct } = props
    const {
        id: productId,
        name: productName,
        imageURL,
        price,
        quantity: maxAvailableQuantity } = cartedProduct.productDetails

    return (
        <Paper variant="outlined" sx={{ padding: 2 }}>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
                spacing={2}
            >
                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} >
                    <Box sx={{ height: 120 }}>
                        <img src={imageURL} height="100%" alt={productName} />
                    </Box>
                    <Box>
                        <Typography variant='subtitle1' fontWeight="bold">{productName}</Typography>
                        <Typography variant='subtitle1' fontWeight="bold">{config.currencySymbol}.{price}</Typography>
                    </Box>
                </Stack>

                <Stack direction="row" spacing={2} >
                    <ShoppingCartItemQuantitySelection
                        maxQuantity={maxAvailableQuantity}
                        currentSelectedQuantity={cartedProduct.cartedProductQuantity}
                    />
                    <Button
                        size="medium" variant='outlined'
                        onClick={() => { console.log(`Delete product with id: ${productId}`) }}
                    >
                        Delete
                    </Button>
                </Stack>
            </Stack>
        </Paper>
    )
}
