import React from 'react'
import { Stack, Typography } from '@mui/material'
import { config } from '../config'

export default function ShoppingCartTotal(props) {
    const { cartTotal } = props
    return (
        <Stack
            direction="row"
            justifyContent={{xs: "space-between", sm: "flex-start"}}
            padding={1}
            paddingY={1.5}
            spacing={1.5}
        >
            <Typography variant='h6' fontWeight='bold'>Cart Total :</Typography>
            <Typography variant='h6' fontWeight='bold'>
                {config.currencySymbol}{cartTotal}
            </Typography>
        </Stack>
    )
}
