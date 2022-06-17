import React from 'react'
import { Stack, Grid } from '@mui/material'
import ProductFiltersPanel from './ProductFiltersPanel'
import ProductsSearchBar from './ProductsSearchBar'
import ProductsGrid from './ProductsGrid'
import ProductFiltersButtonToShowDialog from './ProductFiltersButtonToShowDialog'

function ProductsPage(props) {
  const { productsToDisplay } = props
  return (
    <>
      <Grid container padding={2} spacing={2}>
        <Grid item sx={{ display: { xs: 'none', sm: 'flex' } }} sm={3} lg={2.5} xl={2}>
          <ProductFiltersPanel></ProductFiltersPanel>
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
              <ProductsSearchBar />
              <ProductFiltersButtonToShowDialog />
            </Stack>

            <ProductsGrid productsToDisplay={productsToDisplay}></ProductsGrid>
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}

export default ProductsPage