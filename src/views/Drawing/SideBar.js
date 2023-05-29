import { useState, useMemo } from "react";
import { Box, Button, Divider, MenuItem, Select, Stack, TextField, Input, Typography, ListItem, List } from "@mui/material";
import { Add } from '@mui/icons-material'
import { useDrawing } from "./Context";
import ItemModule from "./ItemModule";

export default function SideBar() {
    const [title, setTitle] = useState('')
    const [vsField, setVsField] = useState({})
    const [selected, setSelected] = useState('')
    const [indicators, setIndicators] = useState([{
        id:0,
        name:'',
        color:'#000'
    }])
    const { fields, modules, addDrawing, loadFields } = useDrawing()

    const handlerChangeTitle = (event) => {
        setTitle( prev => event?.target?.value )
    }

    const handlerSelectModule = async (event) => {
        await loadFields( event.target.value )
        setSelected( prev => event.target.value )
    }

    const handlerChangeColor = (index) => (event) => {
        setIndicators( prev => prev.toSpliced(index, 1, {
            ...prev[index],
            color: event.target.value
        }))
    }

    const handlerChangeIndicator = (index, id) => (event) => {
        const fieldTarget = fieldsNumber.find( field => field.id===event.target.value )
        setIndicators( prev => prev.toSpliced(index, 1, {
            id: fieldTarget.id,
            name: fieldTarget.api_name,
            color: prev[index]?.color || '#000'
        }))
    }
    
    const fieldsNumber = useMemo( ()=>{
        return fields.filter( element => element.api_name!=='id' && (['integer', 'currency', 'bigint'].includes( element.data_type ) || ['integer','double'].includes(element.json_type) || element.api_name==='drawing_count_records') )
    }, [fields])

    const handlerAddIndicator = () => {
        setIndicators( prev => ([
            ...prev,
            { id:null, name:'', color:'#000' }
        ]))
    }

    const handlerSelectVsField = (event) => {
        const field = fields.find( field => field.id===event.target.value )
        setVsField( prev => ({
            id: event.target.value,
            name: field.display_label,
            api_name: field.api_name

        }) )
    }

    const handlerAdd = () => {
        const graphic = {
            title,
            entity:{
                id:selected,
                name: modules.find( module => module.id === selected ).module_name
            },
            indicators,
            vsField
        }
        addDrawing( graphic )
        setTitle('')
        setSelected('')
        setIndicators([{
            id:0,
            name:'',
            color:'#000'
        }])
        setVsField({})
    }


    return <Box sx={{ p:2 }}>
        <Stack spacing={1} sx={{ mb:2 }}>
            <TextField onChange={handlerChangeTitle} value={title}/>
            <Divider />
            { selected }
            <Select value={selected} onChange={handlerSelectModule}>
                { modules.map( module => <MenuItem key={module.id} value={module.id}>{module.module_name}</MenuItem>)}
            </Select>
            <Stack sx={{ borderLeft: '2px solid #d0d0d0' }}>
                {indicators.map( (indicator, index) => <ListItem
                    key={`indicator-${index}`}
                    secondaryAction={
                        indicator.name !== '' ?
                        <Input type='color' onChange={handlerChangeColor(index)} sx={{ width:20, height:20, overflow:'hidden' }} value={indicator.color}/>:
                        <Box sx={{ m:1, borderRadius:'50%', width:20, height:20, overflow:'hidden', background:'#aaa' }}/>
                    }
                >
                    <Select onChange={handlerChangeIndicator(index, indicator.id)} value={indicator.id} sx={{ width:'100%', '.MuiSelect-select': { p:'10px' } }} disabled={selected===''}>
                        { fieldsNumber.map( ({ id, display_label, api_name }) => <MenuItem key={`field1-${id}`} value={id}>{display_label}</MenuItem> )}
                    </Select>
                </ListItem>)}
                
                <ListItem>
                    <Button variant='outlined' sx={{ width:'100%' }} startIcon={<Add />} onClick={handlerAddIndicator} disabled={selected===''}>Agregar Indicador</Button>
                </ListItem>
            </Stack>
            <Divider />
            <Select value={vsField.id} onChange={handlerSelectVsField} startAdornment={<Typography sx={{ borderRight:'1px solid #a0a0a0', pr:1 }}>Vs</Typography>} sx={{ width:'100%', '.MuiSelect-select': { p:'10px' } }} disabled={selected===''}>
                { fields.filter( ({api_name}) => api_name!=='drawing_count_records').map( ({ id, display_label, api_name, json_type, data_type }) => <MenuItem key={`field2-${id}`} value={id}>{display_label}</MenuItem> )}
            </Select>
        </Stack>
        <Button variant='outlined' onClick={handlerAdd} disabled={title===''}>Agregar</Button>
    </Box>
}