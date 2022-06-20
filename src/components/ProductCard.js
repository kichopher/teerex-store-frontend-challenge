import React from 'react'
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Stack,
    Divider,
    Button,
    ButtonGroup
} from '@mui/material'
import { config } from '../config'

export default function ProductCard(props) {
    const { productDataObject, cartQueries } = props
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
   
    //minimum 0 (if zero than remove from cart), maximum= available quantity
    const productId = productDataObject.id
    const productIsInCart = cartQueries.isProductInCart(productId)
    const cartedProductQuantity = cartQueries.getCartedProductQuantity(productId)

    const handleQuantityChange = (changeValue) => {
        const newQuantity = changeValue + cartedProductQuantity
        cartQueries.updateCartedProductQuantity(productId, newQuantity)
    }

    return (
        <Card variant="outlined">
            <CardMedia
                component="img"
                alt={productDataObject.name}
                height="200"
                image={productDataObject.imageURL}
            />
            <Divider />
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
                    {productIsInCart ?
                        <ButtonGroup variant="contained" aria-label="product quantity change button group">
                            <Button onClick={() => handleQuantityChange(-1)}>–</Button>
                            <Button sx={{ pointerEvents: "none" }}>{cartedProductQuantity}</Button>
                            <Button onClick={() => handleQuantityChange(1)}>+</Button>
                        </ButtonGroup>
                        :
                        <Button size="medium" variant='contained'
                            onClick={() => cartQueries.addNewCartItem(productId)}
                        >Add to cart</Button>}
                </CardActions>
            </Stack>
        </Card>
    )
}
