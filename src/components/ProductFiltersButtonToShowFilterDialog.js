import React from 'react'
import { Button, Box, Dialog } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
// import ProductFiltersPanel from './ProductFiltersPanel';

export default function ProductFiltersButtonToShowFilterDialog(props) {
    const children = props.children
    const {isFilterDialogOpen, handleFilterDialogOpen, handleFilterDialogClose} = props

    return (
        <Box>
            <Button
                variant="contained"
                sx={{ display: { xs: 'flex', sm: 'none' }, height: '100%' }}
                onClick={handleFilterDialogOpen}
            >
                <FilterAltIcon />
            </Button>
            <Dialog open={isFilterDialogOpen} onClose={handleFilterDialogClose}>
                {children}
            </Dialog>

        </Box>

    )
}
