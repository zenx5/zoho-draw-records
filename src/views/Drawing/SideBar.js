import { Box, Button, MenuItem, Stack, Typography } from "@mui/material";
import { useDrawing } from "./Context";

export default function SideBar() {
    const {modules, selectIt} = useDrawing()

    const handlerClick = (id) => {
        selectIt(id)
    }

    return <Box>
        <Typography>Side bar</Typography>
        <Stack spacing={1}>
            {
                modules.map( module => <MenuItem key={module.id} onClick={()=>handlerClick(module.id)}>{module.module_name}</MenuItem>)
            }
        </Stack>
    </Box>
}