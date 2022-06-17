import React from 'react'
import { Checkbox, Typography, Stack, FormControlLabel } from '@mui/material'

export default function ProductFilterGroup(props) {
    const { filterCategory, filters } = props
    return (
        <Stack marginY={1.25}>
            <Typography variant='subtitle1' fontWeight='bold' >{filterCategory}</Typography>
            <Stack marginLeft={2}>
                {filters.map((filter, index) => {
                    return (
                        <FormControlLabel
                            label={filter}
                            key={index}
                            control={<Checkbox color='primary' size="small"/>}
                        />
                    )
                })}
            </Stack>
        </Stack>
    )
}
