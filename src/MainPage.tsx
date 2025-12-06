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

/**
 * Props definition for MainPage
 */
type MainPageProps = {
    /** Currently logged in user's username */
    user: string;
}

/**
 * Component for the Main page.
 * After login, the user's rated movies list is shown here.
 * Interactions with the rated movies, adding new rating is done from here
 */
export function MainPage({ user }: MainPageProps) {
    // user's movie list
    const [movies, setMovies] = useState(() => {
        return movieService.getMovies(user);
    });
    const [selectedMovie, setSelectedMovie] = useState<SavedMovie | null>(null);

    // Different page for each interaction
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [info, setInfo] = useState(false);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    /**
     * Saves the new movie rating to the user's list
     * @param movieToSave The rated movie to save
     */
    const save = (movieToSave: SavedMovie) => {
        movieService.saveMovie(movieToSave, user);
        setMovies(movieService.getMovies(user));
        setSelectedMovie(null);
    };

    /**
     * Deletes the movie from the user's list
     * @param id ID of the movie to delete
     */
    const del = (id: number) => {
        movieService.deleteMovie(id, user);
        setMovies(movieService.getMovies(user));
        setDeleteDialogOpen(false);
        setSelectedMovie(null);
    };

    /**
     * Favorite / Unfavorite the movie
     * @param id The movie to toggle favorite of
     */
    const toggleFavorite = (id: number) => {
        movieService.toggleFavorite(id, user);
        setMovies(movieService.getMovies(user));
        setSelectedMovie(null);
    }

    return <>
        {/* Page for adding a new movie */}
        {add && <AddMoviePage onBack={() => setAdd(false)} onSave={save} />}

        {/* Page to edit a rated movie */}
        {edit && <EditMoviePage movie={selectedMovie} onBack={() => setEdit(false)} onSave={save} />}

        {/* Page to check a rated movie */}
        {info && selectedMovie &&
            <InfoPage movie={selectedMovie} onBack={() => setInfo(false)} />
        }

        {/* User's movie list, each movie is a MovieCard */}
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

        {/* Placeholder text if movie list is empty */}
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

        {/* Confirmation before movie delete */}
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