import React from 'react'
import { Stack } from '@mui/material'
import ShoppingCartItemCard from './ShoppingCartItemCard'

export default function ShoppingCartItemsList(props) {
    const { cartedProducts } = props

    return (
        <Stack spacing={2}>
            {
                cartedProducts.map((cartedProduct) => {
                    return (
                        <ShoppingCartItemCard
                            cartedProduct={cartedProduct}
                            key={cartedProduct.productDetails.id}
                        />
                    )
                })
            }
        </Stack>
    )
}
