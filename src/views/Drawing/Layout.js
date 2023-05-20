import { Grid } from "@mui/material";
import SideBar from "./SideBar";
import Drawing from "./Drawing";

export default function LayoutDrawing() {


    return <Grid container>
        <Grid item xs={3}>
            <SideBar />
        </Grid>
        <Grid item xs={9}>
            <Drawing />
        </Grid>
    </Grid>
}