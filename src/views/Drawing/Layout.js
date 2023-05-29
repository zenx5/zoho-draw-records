import { Grid } from "@mui/material";
import SideBar from "./SideBar";
import Draws from "./Draws";

export default function LayoutDrawing() {


    return <Grid container sx={{ height:'100vh' }}>
        <Grid item xs={3} sx={{ backgroundColor:'#fff' }}>
            <SideBar />
        </Grid>
        <Grid item xs={9}>
            <Draws />
        </Grid>
    </Grid>
}