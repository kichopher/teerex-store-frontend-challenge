import React from 'react'
import { Stack } from '@mui/material'
import ShoppingCartItemCard from './ShoppingCartItemCard'

export default function ShoppingCartItemsList(props) {
    const {
        cartedProductDetails,
        getProductDetailsUsingProductId,
        cartQueries } = props

    return (
        <Stack spacing={2}>
            {
                cartedProductDetails.map((cartedProductDetail) => {
                    return (
                        <ShoppingCartItemCard key={cartedProductDetail.productId}
                            cartedProductDetail={cartedProductDetail}
                            getProductDetailsUsingProductId={getProductDetailsUsingProductId}
                            cartQueries={cartQueries}
                        />
                    )
                })
            }
        </Stack>
    )
}
