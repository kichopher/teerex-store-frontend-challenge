import React from 'react'
import { TextField, Stack, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';


export default function ProductsSearchBar() {
    return (
        <Stack direction="row" spacing={0.5}>
            <TextField label="Search products" type="search" size="small" />
            <Button variant="contained" ><SearchIcon/></Button>
        </Stack>
    )
}
