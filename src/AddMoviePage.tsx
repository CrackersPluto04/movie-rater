import { useState } from "preact/hooks";
import { SavedMovie, TMDbMovie } from "./Types";
import { movieService } from "./MovieService";
import { Avatar, Box, Button, List, ListItem, ListItemAvatar, ListItemText, ListItemButton, Paper, Stack, TextField, Typography, Rating } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from '@mui/icons-material/Save';

type AddMoviePageProps = {
    onBack: () => void;
    username: string;
}

export function AddMoviePage({ onBack, username }: AddMoviePageProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<TMDbMovie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<TMDbMovie | null>(null);

    const [review, setReview] = useState("");
    const [rating, setRating] = useState<number>(0);
    const [pros, setPros] = useState("");
    const [cons, setCons] = useState("");

    const newMovie: SavedMovie = selectedMovie ? {
        ...selectedMovie,
        review,
        rating,
        pros,
        cons,
        favorite: false
    }
        : null;

    const search = () => movieService.handleSearch(query, setResults, () => setSelectedMovie(null));
    const save = () => {
        movieService.saveMovie(newMovie, username);
        onBack();
    }

    return <Stack spacing={3}>
        <Typography variant="h4">Add New Movie Rating</Typography>

        {/* --- SEARCH BAR --- */}
        <Paper sx={{ p: 2 }}>
            <Stack direction="row" spacing={1}>
                <TextField
                    fullWidth
                    label="Search movie title..."
                    value={query}
                    onChange={(e) => setQuery(e.currentTarget.value)}
                    onKeyDown={(e) => e.key === 'Enter' && search()}
                />
                <Button variant="contained" onClick={search} startIcon={<SearchIcon />}>
                    Search
                </Button>
            </Stack>

            {/* --- SEARCH RESULTS --- */}
            {!selectedMovie && results.length > 0 && (
                <List sx={{ maxHeight: 300, overflow: 'auto', mt: 1 }}>
                    {results.map((movie) => (
                        <ListItem key={movie.id} disablePadding>
                            <ListItemButton onClick={() => setSelectedMovie(movie)}>
                                <ListItemAvatar>
                                    <Avatar src={movieService.getPosterUrl(movie.poster_path)} variant="rounded" />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={movie.title}
                                    secondary={movie.release_date}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            )}
        </Paper>

        {/* --- MOVIE FROM (if a movie is chosen) --- */}

        {/* --- EDIT FORM ÉS EZ A FORM LEHET UGYANAZ ÚJ KOMPONENSBE, IG --- */}
        {selectedMovie && (
            <Paper sx={{ p: 3, border: '2px solid #1976d2' }}>
                <Typography variant="h5" gutterBottom>
                    Selected: <b>{selectedMovie.title}</b>
                </Typography>

                <Stack spacing={2}>
                    <Box>
                        <Typography component="legend">Your Rating</Typography>
                        <Rating
                            value={rating}
                            onChange={(_, newValue) => setRating(newValue || 0)}
                            size="large"
                        />
                    </Box>

                    <TextField
                        label="Pros (Why did you like it?)"
                        multiline rows={2}
                        value={pros} onChange={(e) => setPros(e.currentTarget.value)}
                    />

                    <TextField
                        label="Cons (What was bad?)"
                        multiline rows={2}
                        value={cons} onChange={(e) => setCons(e.currentTarget.value)}
                    />

                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="outlined" onClick={() => setSelectedMovie(null)}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="success" startIcon={<SaveIcon />} onClick={save}>
                            Save to Collection
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        )}
    </Stack>
}