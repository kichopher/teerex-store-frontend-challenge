import React from 'react'
import { Grid } from '@mui/material'
import ProductCard from './ProductCard'

export default function ProductsGrid(props) {
    const { productsToDisplay } = props

    return (
        <Grid container>
            {productsToDisplay.map((productDataObject) => {
                return (
                    <Grid item
                        key={productDataObject.id}
                        xs={12} sm={6} lg={4} xl={3}
                        padding={1} paddingTop={0} paddingBottom={2}
                    >
                        <ProductCard productDataObject={productDataObject} />
                    </Grid>
                )
            })}
        </Grid>
    )
}
