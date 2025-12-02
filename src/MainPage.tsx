import { Grid, IconButton, Typography } from "@mui/material";
import { useState } from "preact/hooks";
import AddIcon from '@mui/icons-material/Add';
import { AddMoviePage } from "./AddMoviePage";
import { EditMoviePage } from "./EditMoviePage";
import { movieService } from "./MovieService";
import { MovieCard } from "./MovieCard";
import { SavedMovie } from "./Types";
import { InfoPage } from "./InfoPage";
import { ConfirmDialog } from "./ConfirmDialog";

type MainPageProps = {
    user: string;
}

export function MainPage({ user }: MainPageProps) {
    const [movies, setMovies] = useState(() => {
        return movieService.getMovies(user);
    });
    const [selectedMovie, setSelectedMovie] = useState<SavedMovie | null>(null);
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [info, setInfo] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const save = (movieToSave: SavedMovie) => {
        movieService.saveMovie(movieToSave, user);
        setMovies(movieService.getMovies(user));
        setSelectedMovie(null);
    };

    const del = (id: number) => {
        movieService.deleteMovie(id, user);
        setMovies(movieService.getMovies(user));
        setDeleteDialogOpen(false);
        setSelectedMovie(null);
    };

    const toggleFavorite = (id: number) => {
        movieService.toggleFavorite(id, user);
        setMovies(movieService.getMovies(user));
        setSelectedMovie(null);
    }

    return <>
        {add && <AddMoviePage onBack={() => setAdd(false)} onSave={save} />}

        {edit && <EditMoviePage movie={selectedMovie} onBack={() => setEdit(false)} onSave={save} />}

        {info && selectedMovie &&
            <InfoPage movie={selectedMovie} onBack={() => setInfo(false)} />
        }

        {movies.length > 0 && !add && !edit && !info &&
            <>
                <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                    <Typography variant="h4">My Rated Movies</Typography>
                    <IconButton color='success' onClick={() => setAdd(true)} size='large'>
                        <AddIcon fontSize='inherit' />
                    </IconButton>
                </Grid>

                <Grid container spacing={2}>
                    {movies.map(movie => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={movie.id}>
                            <MovieCard
                                movie={movie}
                                onDelete={() => {
                                    setSelectedMovie(movie);
                                    setDeleteDialogOpen(true)
                                }}
                                onToggleFavorite={() => toggleFavorite(movie.id)}
                                onClick={() => {
                                    setSelectedMovie(movie);
                                    setEdit(true);
                                }}
                                onInfo={() => {
                                    setSelectedMovie(movie);
                                    setInfo(true);
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </>
        }

        {movies.length === 0 && !add && !edit && !info &&
            <>
                <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                    <Typography variant="h4">My Rated Movies</Typography>
                    <IconButton color='success' onClick={() => setAdd(true)} size='large'>
                        <AddIcon fontSize='inherit' />
                    </IconButton>
                </Grid>

                <Typography variant="body1" sx={{ p: 2 }}>
                    You haven't added a rating yet. Click the + button!
                </Typography>
            </>
        }

        <ConfirmDialog
            open={deleteDialogOpen}
            title="Delete Rated Movie"
            content="Are you sure you want to delete this movie? This action cannot be undone."
            onConfirm={() => {
                if (selectedMovie) {
                    del(selectedMovie.id);
                }
            }}
            onCancel={() => setDeleteDialogOpen(false)}
        />
    </>
}