import { Grid, IconButton, Typography } from "@mui/material";
import { useState } from "preact/hooks";
import AddIcon from '@mui/icons-material/Add';
import { AddMoviePage } from "./AddMoviePage";
import { EditMoviePage } from "./EditMoviePage";
import { movieService } from "./MovieService";
import { MovieCard } from "./MovieCard";

type MainPageProps = {
    user: string;
}

export function MainPage({ user }: MainPageProps) {
    const [movies, setMovies] = useState(() => {
        return movieService.getMovies(`movies_${user}`);
    });
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);

    return <>
        {add && <AddMoviePage onBack={() => setAdd(false)} username={user} />}

        {edit && <EditMoviePage onCancel={() => setEdit(false)} />}

        {movies.length > 0 && !add && !edit &&
            <>
                <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                    <Typography variant="h4">My Rated Movies</Typography>
                    <IconButton color='success' onClick={() => setAdd(true)}>
                        <AddIcon />
                    </IconButton>
                </Grid>

                <Grid container spacing={2}>
                    {movies.map(movie => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={movie.id}>
                            <MovieCard
                                movie={movie}
                                onDelete={() => movieService.deleteMovie(movie.id, user)}
                                //onToggleFavorite={handleToggleFavorite}
                                onClick={() => {
                                    setSelectedMovieId(movie.id);
                                    setEdit(true);
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </>
        }

        {movies.length === 0 && !add && !edit &&
            <>
                <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                    <Typography variant="h4">My Rated Movies</Typography>
                    <IconButton color='success' onClick={() => setAdd(true)} size='large'>
                        <AddIcon fontSize='inherit' />
                    </IconButton>
                </Grid>

                <Typography variant="body1" sx={{ p: 2 }}>
                    Nincs még felvett filmed. Kattints a + gombra!
                </Typography>
            </>
        }
    </>
}