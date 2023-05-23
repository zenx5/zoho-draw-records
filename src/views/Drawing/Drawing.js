import { Box, Card, CardContent, Typography } from "@mui/material";
import BarComponent from "./charts/Bar";
import { useDrawing } from "./Context";



export default function Drawing() {
    const {drawings, modules} = useDrawing()


    return <Box>
        { drawings.map( drawing => <Card key={drawing.title}>
            <CardContent>
                <Typography>{drawing.title}</Typography>
                <Box>
                    <BarComponent title={drawing.title} indicators={drawing.indicators}/>
                </Box>
            </CardContent>
        </Card> )}
    </Box>
}