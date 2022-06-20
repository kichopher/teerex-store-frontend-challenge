import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useNavigate} from 'react-router-dom'
import { Button, Badge } from "@mui/material"

export default function NavBarShoppingCartButton(props) {
    let navigate = useNavigate()
    let { cartItemCount } = props
    let cartItemCountBadge_isInvisible = !cartItemCount //true when cartItemCount is 0, therefore the badge becomes invisible when there are no items in cart
    return (
        <>
            <Badge badgeContent={cartItemCount} color="secondary" invisible={cartItemCountBadge_isInvisible}>
                <Button onClick={()=>navigate('/cart')} variant="contained" sx={{ display: { sm: 'none' } }}><ShoppingCartIcon /></Button>
                <Button onClick={()=>navigate('/cart')} variant="contained" sx={{ display: { xs: 'none', sm: 'flex' } }} endIcon={<ShoppingCartIcon />}>Shopping Cart</Button>
            </Badge>
        </>
    )
}
