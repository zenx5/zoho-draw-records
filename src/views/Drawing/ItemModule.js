import { useEffect, useMemo, useState } from 'react'
import {
    Stack,
    ListItem,
    ListItemText,
    Box,
    Select,
    MenuItem,
    Divider,
    IconButton,
    Input,
    LinearProgress,
    Typography,
    CircularProgress,
    FormHelperText
} from '@mui/material'

import { CheckBoxOutlineBlank, CheckBoxOutlined } from '@mui/icons-material'


export default function ItemModule({
    id,
    name,
    checked,
    fields,
    field,
    vsField,
    color,
    onSelected,
    onChangeField,
    onChangeVsField,
    onChangeColor
}) {
    const [loading, setLoading] = useState(false)

    const handlerSelect = async () => {
        setLoading(true)
        await onSelected(id)
        setLoading(false)
    }

    // (element) => element.api_name!=='id' && (['currency', 'bigint'].includes( element.data_type ) || element.json_type==='double')

    const fieldsNumber = useMemo( ()=>{
        return fields.filter( element => element.api_name!=='id' && (['integer', 'currency', 'bigint'].includes( element.data_type ) || ['integer','double'].includes(element.json_type) ) )
    }, [fields])


    return <Stack>
        <ListItem
            secondaryAction={<IconButton onClick={handlerSelect} >
                { checked ? <CheckBoxOutlined/> :<CheckBoxOutlineBlank/> }
            </IconButton>}
        >
            <ListItemText primary={<Typography sx={{ display:'flex', alignItems:'center', gap:2 }}>{name} {loading && <CircularProgress size={20} /> }</Typography>} />
        </ListItem>
        { checked && <ListItem
            secondaryAction={<Input type='color' onChange={onChangeColor} sx={{ m:1, borderRadius:'50%', width:20, height:20, overflow:'hidden', background:color }} value={color}/>}
        >
            <Select onChange={onChangeField} value={field} sx={{ width:'100%', '.MuiSelect-select': { p:'10px' } }} disabled={fieldsNumber.length===0}>
                { fieldsNumber.map( ({ display_label, api_name }) => <MenuItem key={display_label} value={api_name}>{display_label}</MenuItem> )}
            </Select>
        </ListItem>}
        { checked && <ListItem>
            <Select onChange={onChangeVsField} value={vsField} startAdornment={<Typography sx={{ borderRight:'1px solid #a0a0a0', pr:1 }}>Vs</Typography>} sx={{ width:'100%', '.MuiSelect-select': { p:'10px' } }} disabled={fieldsNumber.length===0}>
                { fields.map( ({ display_label, api_name, json_type, data_type }) => <MenuItem key={display_label} value={api_name}>{display_label}: {json_type}-{data_type}</MenuItem> )}
            </Select>
        </ListItem>}
        { checked && fields.length===0 && <FormHelperText sx={{ color:'#f00', ml:2 }}>Not Fields</FormHelperText>}
        <Divider />
    </Stack>

}