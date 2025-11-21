import { Grid, IconButton, Typography } from "@mui/material";
import { useState } from "preact/hooks";
import AddIcon from '@mui/icons-material/Add';
import { AddMoviePage } from "./AddMoviePage";
import { EditMoviePage } from "./EditMoviePage";

type MainPageProps = {
    user: string;
}

export function MainPage({ user }: MainPageProps) {
    const [movies, setMovies] = useState(() => {

    });
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);

    return <>
        {add && <AddMoviePage onBack={() => setAdd(false)} username={user} />}

        {edit && <EditMoviePage onCancel={() => setEdit(false)} />}

        {(!add && !edit) && <>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                <Typography variant="h4">My Rated Movies</Typography>
                <IconButton color='success' onClick={() => setAdd(true)}>
                    <AddIcon />
                </IconButton>
            </Grid>

            <Typography variant="body1" sx={{ p: 2 }}>
                Nincs még felvett filmed. Kattints a + gombra!
            </Typography>
        </>}
    </>
}