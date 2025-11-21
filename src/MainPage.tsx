import { Button, Fab, Grid, Typography } from "@mui/material";
import { useState } from "preact/hooks";
import { PageContainer } from "./PageContainer";
import AddIcon from '@mui/icons-material/Add';

export function MainPage() {
    const [movies, setMovies] = useState([]);

    return <>
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
            <Typography variant="h4">My Movies</Typography>
        </Grid>

        <Grid container spacing={3} border={1}>
            <Typography variant="body1" sx={{ p: 2 }}>
                Nincs még felvett filmed. Kattints a + gombra!
            </Typography>
        </Grid>

        <Fab
            color='primary'
            sx={{ position: 'fixed' }}
            onClick={() => alert("Itt nyílik majd a Hozzáadás ablak!")}
        >
            <AddIcon />
        </Fab>
    </>
}