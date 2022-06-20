import React from 'react'
import { FormControl, Select, MenuItem } from '@mui/material'


export default function ShoppingCartItemQuantitySelection(props) {
    const {
        maxQuantity,
        currentSelectedQuantity,
        productId,
        updateCartedProductQuantity } = props

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
                value={currentSelectedQuantity} 
                onChange={(e) => {
                    const newQuantity = e.target.value
                    updateCartedProductQuantity(productId, newQuantity)
                }}
            >
                {generateMenuItemList(maxQuantity)}
            </Select>
        </FormControl>
    )
}
