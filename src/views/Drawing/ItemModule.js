import { useState } from 'react'
import {
    Stack,
    ListItem,
    ListItemText,
    Box,
    Select,
    MenuItem,
    Divider,
    IconButton,
    Input
} from '@mui/material'

import { CheckBoxOutlineBlank, CheckBoxOutlined } from '@mui/icons-material'


export default function ItemModule({
    id,
    name,
    checked,
    field,
    color,
    onSelected,
    onChangeField,
    onChangeColor
}) {

    return <Stack>
        <ListItem
            secondaryAction={<IconButton onClick={()=>onSelected(id)} >
                { checked ? <CheckBoxOutlined/> :<CheckBoxOutlineBlank/> }
            </IconButton>}
        >
            <ListItemText primary={name} />
        </ListItem>
        { checked && <Box sx={{ display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
            <Select onChange={onChangeField} value={field} sx={{ width:'80%' }}>
                <MenuItem value='Item 1'>Item 1</MenuItem>
                <MenuItem value='Item 2'>Item 2</MenuItem>
                <MenuItem value='Item 3'>Item 3</MenuItem>
            </Select>
            <Input type='color' onChange={onChangeColor} sx={{ m:1, borderRadius:'50%', width:20, height:20, overflow:'hidden', background:color }} value={color}/>
        </Box>}
        <Divider />
    </Stack>

}