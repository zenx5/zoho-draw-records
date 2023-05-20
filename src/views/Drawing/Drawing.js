import { Box, Typography } from "@mui/material";
import { useDrawing } from "./Context";

export default function Drawing() {
    const {current, modules} = useDrawing()

    return <Box>
        <Typography>Drawing Component</Typography>
        { current && <Typography>Ha seleccionado el modulo: {modules.find( module => module.id == current)?.module_name }</Typography>}
    </Box>
}