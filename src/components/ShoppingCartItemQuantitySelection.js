import React from 'react'
import { FormControl, Select, MenuItem} from '@mui/material'


export default function ShoppingCartItemQuantitySelection(props) {
    const { maxQuantity, currentSelectedQuantity } = props

    const generateMenuItemList = (maxQuantity) => {
        const menuItemList = []
        for (let i = 1; i <= maxQuantity; i++) {
            const newMenuItem = <MenuItem value={i} key={i}>{`Qty: ${i}`}</MenuItem>
            menuItemList.push(newMenuItem)
        }
        return menuItemList
    }

    return (
        <FormControl size="small">
            <Select
                paddingX={0}
                // value={currentSelectedQuantity} //controlled
                defaultValue={currentSelectedQuantity} //uncontrolled
                onChange={(e) => {
                    console.log(`Quantity changed to ${e.target.value}`)
                }}
            >
                {generateMenuItemList(maxQuantity)}
            </Select>
        </FormControl>
    )
}
