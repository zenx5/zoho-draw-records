import { Box, Typography } from "@mui/material";
import { useDrawing } from "./Context";

export default function Drawing() {
    const {drawings, modules} = useDrawing()

    return <Box>
        <Typography>Drawing Component</Typography>
        { drawings.map( drawing => <Box key={drawing.title}>
            <Typography>{drawing.title}</Typography>
            <Box sx={{ ml:3 }}>
                { drawing?.indicators?.map( indicator => <Typography key={indicator.id} sx={{ fontWeight:'bold', color: indicator.color }}>{indicator.module}</Typography>) }
            </Box>
        </Box> )}
    </Box>
}