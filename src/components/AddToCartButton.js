import React from 'react'
import { Button, ButtonGroup } from '@mui/material'

export default function AddToCartButton() {
    const productIsInCart = Boolean(Math.round(Math.random())) //1 or 0

    return (
        <>
            {productIsInCart ?
                <ButtonGroup variant="contained" aria-label="product quantity change button group">
                    <Button>–</Button>
                    <Button sx={{pointerEvents: "none"}}>1</Button>
                    <Button>+</Button>
                </ButtonGroup>
                :
                <Button size="medium" variant='contained'>Add to cart</Button>}

        </>
    )
}
