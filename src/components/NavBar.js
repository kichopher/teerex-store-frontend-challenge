import React from 'react'
import { Box, Stack, Typography, Button, Divider, Link } from "@mui/material"
import ShoppingCartNavButton from './ShoppingCartNavButton';

export default function NavBar() {
    let cartItemCount = 4
    return (
        <Box >
            <Stack
                spacing={2}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                padding={2}

            >
                <Link href="/" underline='none'><Typography fontWeight='bold' variant="h5">TeeRex Store</Typography></Link>
                <Stack direction="row" spacing={2}>
                    <Button href="/" variant="outlined">Products</Button>
                    <ShoppingCartNavButton cartItemCount={cartItemCount} />
                </Stack>
            </Stack>
            <Divider />
        </Box>
    )
}
