import { useState } from "react";
import { Stack, Button, Box, Card, CardContent, Typography, List, ListSubheader, ListItem, IconButton, ListItemText } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import BarComponent from "./charts/Bar";
import { useDrawing } from "./Context";
import useVisibility from "../../hooks/useVisibility";
import ToggleVisibility from "../../components/ToggleVisibility";



export default function Drawing() {
    const [ visibility, setVisibility ] = useState({})
    const {drawings, modules} = useDrawing()

    const controlVisibility = (hash) => (visible) => {
        setVisibility( prev => ({
            ...prev,
            [hash]: !!!prev[hash]
        }))
    }

    const filterByVisibility = (title) => (indicator) => {
        const hash = `${title}-${indicator.field}-${indicator.vsField}`
        return !!visibility[hash]
    }

    return <Box sx={{ display:'flex', flexDirection:'column', height:'100%', p:5, gap:2 }}>
        { drawings.map( drawing => <Card key={drawing.title} sx={{ height:500, p:2 }}>
            <CardContent>
                <Typography variant='h3' sx={{ fontSize:'1.2rem', fontWeight:'bold', mb:2}}>{drawing.title || drawing.indicators.map( ({module, field, vsField}) => `${module}(${field}-${vsField})` ).join(' | ') }</Typography>
                <Box sx={{ display:'flex', height:400 }}>
                    <BarComponent title={drawing.title} indicators={drawing.indicators} entity={drawing.entity} vsField={drawing.vsField} />
                    <Stack spacing={2} p={2} sx={{ width:'100%'}}>
                        <List>
                            <ListSubheader>Indicators</ListSubheader>
                            { drawing.indicators
                                .map( indicator => <ListItem
                                    secondaryAction={<ToggleVisibility onToggle={controlVisibility(`${drawing.title}-${indicator.field}-${indicator.vsField}`)} />}>
                                <ListItemText
                                    primary={`${indicator.name} vs ${drawing.vsField.name}`}
                                    secondary={ visibility[`${drawing.title}-${indicator.name}-${drawing.vsField.name}`] ? 'active' : 'inactive' }
                                />
                            </ListItem>) }
                            <ListSubheader>Actions</ListSubheader>
                        </List>
                    </Stack>
                </Box>
            </CardContent>
        </Card> )}
    </Box>
}