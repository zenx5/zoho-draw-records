import { Grid } from "@mui/material";
import SideBar from "./SideBar";
import Draw from "./Draw";

export default function LayoutDrawing() {


    return <Grid container sx={{ height:'100vh' }}>
        <Grid item xs={3} sx={{ backgroundColor:'#fff' }}>
            <SideBar />
        </Grid>
        <Grid item xs={9}>
            <Draw />
        </Grid>
    </Grid>
}