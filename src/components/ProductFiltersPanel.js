import React from 'react'
import { Paper, Typography, Stack, Divider, Box, IconButton } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done';
// import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ProductFilterGroup from './ProductFilterGroup'
import { config } from '../config'

export default function ProductFiltersPanel(props) {
  const { hasDoneButton, handleDoneButtonClick } = props
  const { productFilterGroups } = config

  const doneButton = hasDoneButton ? (
    <IconButton
      onClick={handleDoneButtonClick}
      aria-label="filter panel close button"
      
    >
      <DoneIcon color="secondary"/>
    </IconButton>
  ) : null

  return (
    <Stack sx={{ width: '100%' }}>
      <Paper variant="outlined" sx={{ padding: 2, paddingTop: 1 }}>
        <Box marginBottom={1}>
          <Stack
            direction='row'
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant='h6'>Filters</Typography>
            {doneButton}
          </Stack>
          <Divider />
        </Box>

        {productFilterGroups.map((productFilterGroup, index) => {
          const { filterCategory, filters } = productFilterGroup
          return <ProductFilterGroup filterCategory={filterCategory} filters={filters} key={filterCategory + index} />
        })}

      </Paper>
    </Stack>
  )
}
