import React from 'react'
import {
  Paper,
  Typography,
  Stack, Divider,
  Box,
  IconButton,
  Checkbox,
  FormControlLabel
} from '@mui/material'
import DoneIcon from '@mui/icons-material/Done';
// import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { config } from '../config'


export default function ProductFiltersPanel(props) {
  const { hasDoneButton, handleDoneButtonClick } = props
  const { filterSelectionStatusObject, handleFilterCheckUncheck } = props

  const { productFilterGroups } = config

  const doneButton = hasDoneButton ? (
    <IconButton
      onClick={handleDoneButtonClick}
      aria-label="filter panel close button"

    >
      <DoneIcon color="secondary" />
    </IconButton>
  ) : null

  const generatePriceFilterTextGivenPriceRangeString = (priceRangeString) => {
    //priceRangeString is of the form 'lowerLimit,upperLimit'
    // extract the limits as numbers first
    //if lowerLimit is -Infinity return `below Rs.${upperLimit}`
    //if upperLimit is Infinity return `above Rs.${lowerLimit}
    const currencySymbol = config.currencySymbol
    const [lowerLimit, upperLimit] = priceRangeString.split(',').map(numberString => Number(numberString))
    if (lowerLimit === -Infinity) return `below ${currencySymbol}${upperLimit}`
    else if (upperLimit === Infinity) return `above ${currencySymbol}${lowerLimit}`
    else return `${currencySymbol}${lowerLimit} – ${currencySymbol}${upperLimit}`
  }

  const generateNewFilterGroup = (filterCategory, filters, key) => {
    return (
      <Stack marginY={1.25} key={key}>
        <Typography variant='subtitle1' fontWeight='bold' >{filterCategory}</Typography>
        <Stack marginLeft={2}>
          {filters.map((filter, index) => {
            let filterText = filter
            if (filterCategory.toLowerCase() === "Price".toLowerCase()) {
              filterText = generatePriceFilterTextGivenPriceRangeString(filter) //here filter will be of the form 'lowerLimit,upperLimit'
            }
            return (
              <FormControlLabel
                label={filterText}
                key={index}
                control={<Checkbox
                  color='primary' size="small"
                  checked={filterSelectionStatusObject[filterCategory][filter]} value={filter}
                  onChange={() => handleFilterCheckUncheck(filterCategory, filter)}
                />}
              />
            )
          })}
        </Stack>
      </Stack>
    )
  }



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
          const key = filterCategory + index
          return generateNewFilterGroup(filterCategory, filters, key)
        })}


      </Paper>
    </Stack>
  )
}
