import { useState } from "react";
import { CheckBox, CheckBoxOutlineBlank, CheckBoxOutlined } from "@mui/icons-material";
import { Input, Box, Button, IconButton, List, ListItem, ListItemText, MenuItem, Select, Stack, TextField, Typography, Divider } from "@mui/material";
import { useDrawing } from "./Context";
import ItemModule from "./ItemModule";

export default function SideBar() {
    const [title, setTitle] = useState('')
    const [fields, setFields] = useState({})
    const [selected, setSelected] = useState([])
    const { modules, addDrawing, loadFields } = useDrawing()

    const handlerSelected = async (id) => {
        await loadFields(id)
        setSelected( prev => {
            if( prev.includes(id) ) {
                return prev.filter( item => item!==id )
            } else {
                return [...prev, id]
            }
        })
    }

    const handlerSelectField = (id, key) => (event) => {
        setFields( prev => ({
            ...prev,
            [id]:{
                ...prev[id],
                [key]: event?.target?.value
            }
        }))
    }

    const handlerAdd = () => {
        const graphic = {
            title,
            indicators:[]
        }

        for( const id of selected ) {
            if( fields[id]?.field ){
                graphic.indicators.push({
                    id:id,
                    module: modules?.find( module => module.id === id )?.module_name,
                    field: fields[id]?.field,
                    vsField: fields[id]?.vsField,
                    color: fields[id]?.color ? fields[id]?.color : '#000',
                })
            }
        }
        console.log( graphic )
        addDrawing( graphic )
        setTitle('')
        setFields({})
        setSelected([])
    }

    const handlerChangeTitle = (event) => {
        setTitle( prev => event?.target?.value )
    }

    return <Box sx={{ p:2 }}>
        <Stack spacing={1} sx={{ mb:2 }}>
            <Typography variant="h5">Create Drawing</Typography>
            <TextField onChange={handlerChangeTitle} value={title}/>
            <List>
                {modules.map( module => <ItemModule
                    key={module.id}
                    id={module.id}
                    name={module.module_name}
                    checked={selected.includes(module.id)}
                    color={fields[module?.id]?.color}
                    fields={module.fields}
                    field={fields[module?.id]?.field}
                    onSelected={handlerSelected}
                    onChangeField={handlerSelectField(module.id, 'field')}
                    onChangeVsField={handlerSelectField(module.id, 'vsField')}
                    onChangeColor={handlerSelectField(module.id, 'color')}
                />)}
            </List>
            {/* <Input type='date' variant='outlined' sx={{ m:1 }}/>
            <Input type='date' variant='outlined' sx={{ m:1 }}/> */}
        </Stack>
        <Button variant='outlined' onClick={handlerAdd}>Agregar</Button>
    </Box>
}