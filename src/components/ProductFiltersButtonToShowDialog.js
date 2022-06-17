import React from 'react'
import { useState } from 'react';
import { Button, Box, Dialog } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ProductFiltersPanel from './ProductFiltersPanel';

export default function ProductFiltersButtonToShowDialog() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleDialogOpen = () => {
        setIsDialogOpen(true)
    }

    const handleDialogClose = () => {
        setIsDialogOpen(false)
    }

    return (
        <Box>
            <Button
                variant="contained"
                sx={{ display: { xs: 'flex', sm: 'none' }, height: '100%' }}
                onClick={handleDialogOpen}
            >
                <FilterAltIcon />
            </Button>
            <Dialog open={isDialogOpen} onClose={handleDialogClose}>
                <ProductFiltersPanel hasDoneButton handleDoneButtonClick={handleDialogClose}/>
            </Dialog>

        </Box>

    )
}
