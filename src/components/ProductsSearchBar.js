import React from 'react'
import { TextField, Stack, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';


export default function ProductsSearchBar(props) {
    const { searchFieldText, handleSearchFieldTextChange, handleSearch } = props

    return (
        <Stack direction="row" spacing={0.5}>
            <TextField label={"Search products"} type="search" size="small"
                value={searchFieldText}
                onChange={(e) => {
                    const newSearchFieldText = e.target.value
                    handleSearchFieldTextChange(newSearchFieldText)
                    if (newSearchFieldText === "") handleSearch("")
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch(searchFieldText)
                    }
                }}
            />
            <Button variant="contained" onClick={() => handleSearch(searchFieldText)}><SearchIcon /></Button>
        </Stack>
    )
}
