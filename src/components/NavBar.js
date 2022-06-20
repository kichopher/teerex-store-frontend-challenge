import React from 'react'
import { Box, Stack, Typography, Button, Divider, Link } from "@mui/material"
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import NavBarShoppingCartButton from './NavBarShoppingCartButton';

export default function NavBar(props) {
    let navigate = useNavigate()
    let { cartItemCount } = props

    return (
        <Box >
            <Stack
                spacing={2}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                padding={2}

            >
                <Link component={RouterLink} to="/" underline='none' >
                    <Typography fontWeight='bold' variant="h5">TeeRex Store</Typography>
                </Link>
                <Stack direction="row" spacing={2}>
                    <Button onClick={() => navigate('/')} variant="outlined">Products</Button>
                    <NavBarShoppingCartButton cartItemCount={cartItemCount} />
                </Stack>
            </Stack>
            <Divider />
        </Box>
    )
}
