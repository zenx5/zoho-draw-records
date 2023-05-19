import { Grid } from "@mui/material";
import SideBar from "./SideBar";
import Drawing from "./Drawing";

export default function LayoutDrawing() {


    return <Grid container>
        <Grid item xs={2}>
            <SideBar />
        </Grid>
        <Grid item xs={10}>
            <Drawing />
        </Grid>
    </Grid>
}