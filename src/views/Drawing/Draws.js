import { useState } from "react";
import { Stack, Button, Box, Card, CardContent, Typography, List, ListSubheader, ListItem, IconButton, ListItemText, Grid, Input } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import BarComponent from "./charts/Bar";
import { useDrawing } from "./Context";
import useVisibility from "../../hooks/useVisibility";
import { ToggleVisibility, Color } from "../../components";



export default function Drawing() {
    const [ visibility, setVisibility ] = useState({})
    const {drawings, colorDrawing, modules} = useDrawing()

    const controlVisibility = (hash) => (visible) => {
        console.log( hash )
        setVisibility( prev => ({
            ...prev,
            [hash]: !!!prev[hash]
        }))
    }

    const filterByVisibility = (drawing) => (indicator) => {
        const hash = `${drawing.title}-${indicator.name}-${drawing.vsField.name}`
        if( !Object.keys(visibility).includes(hash) ) return true
        return !!visibility[hash]
    }

    const handlerChangeColor = (indexDrawing, indexIndicator) => (color) => {
        colorDrawing(indexDrawing, indexIndicator, color)
    }

    return <Box sx={{ display:'flex', flexDirection:'column', height:'100%', p:5, gap:2 }}>
        { drawings.map( (drawing, index) => <Card key={drawing.title} sx={{ height:500, p:2 }}>
            <CardContent>
                <Typography variant='h3' sx={{ fontSize:'1.2rem', fontWeight:'bold', mb:2}}>{drawing.title || drawing.indicators.map( ({module, field, vsField}) => `${module}(${field}-${vsField})` ).join(' | ') }</Typography>
                <Grid container sx={{ height:200 }}>
                    <Grid item xs={12} md={8} xl={9}>
                        <BarComponent title={drawing.title} indicators={drawing.indicators.filter( filterByVisibility(drawing) )} entity={drawing.entity} vsField={drawing.vsField} />
                    </Grid>
                    <Grid item xs={12} md={4} xl={3}>
                        <Stack spacing={2} p={2} sx={{ width:'100%'}}>
                            <List>
                                <ListSubheader>Indicators</ListSubheader>
                                { drawing.indicators
                                    .map( (indicator, indexIndicator) => <ListItem
                                        secondaryAction={<ToggleVisibility onToggle={controlVisibility(`${drawing.title}-${indicator.name}-${drawing.vsField.name}`)} />}>
                                    <ListItemText
                                        primary={
                                            indicator.name === 'drawing_count_records' ?
                                            `Count by ${drawing.vsField.name}` : 
                                            `${indicator.name} vs ${drawing.vsField.name}`}
                                        secondary={ <Color size='small' value={indicator.color} onChange={handlerChangeColor(index, indexIndicator)}/> }
                                    />
                                </ListItem>) }
                                <ListSubheader>Actions</ListSubheader>
                            </List>
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
        </Card> )}
    </Box>
}