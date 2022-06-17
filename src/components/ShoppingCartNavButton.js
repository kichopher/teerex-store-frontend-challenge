import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Stack, Typography, Button, Divider, Link, Badge } from "@mui/material"

export default function ShoppingCartNavButton(props) {
    let {cartItemCount} = props
    let cartItemCountBadge_isInvisible = !cartItemCount //true when cartItemCount is 0, therefore the badge becomes invisible when there are no items in cart
    return (
        <>
            <Badge badgeContent={cartItemCount} color="secondary" invisible={cartItemCountBadge_isInvisible}>
                <Button href="/cart" variant="contained" sx={{ display: { sm: 'none' } }}><ShoppingCartIcon /></Button>
                <Button href="/cart" variant="contained" sx={{ display: { xs: 'none', sm: 'flex' } }} endIcon={<ShoppingCartIcon />}>Shopping Cart</Button>
            </Badge>
        </>
    )
}
