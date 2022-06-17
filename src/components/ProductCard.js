import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, Stack, Divider } from '@mui/material'
import { config } from '../config'
import AddToCartButton from './AddToCartButton'

export default function ProductCard(props) {
    const { productDataObject } = props
    //sample: productDataObject = { 
    //     id: 1,
    //     imageURL: "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/polo-tshirts.png",
    //     name: "Black Polo",
    //     type: "Polo",
    //     price: 250,
    //     currency: "INR",
    //     color: "Black",
    //     gender: "Men",
    //     quantity: 3
    // }

    return (
        <Card  variant="outlined">
            <CardMedia
                component="img"
                alt={productDataObject.name}
                height="200"
                image={productDataObject.imageURL}
            />
            <Divider/>
            <Stack
                direction="row"
                justifyContent="space-around"
            >
                <CardContent>
                    <Typography variant="subtitle1" >
                        {productDataObject.name}
                    </Typography>
                    <Typography variant="h6" fontWeight='bold'>
                        {`${config.currencySymbol} ${productDataObject.price}`}
                    </Typography>
                </CardContent>
                <CardActions>
                    <AddToCartButton></AddToCartButton>
                </CardActions>
            </Stack>
        </Card>
    )
}
