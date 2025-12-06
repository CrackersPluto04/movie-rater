import { useEffect, useRef, useState } from "preact/hooks";
import { SavedMovie, TMDbMovie } from "./Types";
import { movieService } from "./MovieService";
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, ListItemButton, Paper, Stack, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { MovieRaterForm } from "./MovieRaterForm";
import { TitleAndBackButton } from "./TitleAndBackButton";

/**
 * Props definition for AddMoviePage
 */
type AddMoviePageProps = {
    /** Called when Back is pressed */
    onBack: () => void;
    /** Called when Save is pressed */
    onSave: (movieToSave: SavedMovie) => void;
}

/**
 * Component to add a new movie rating.
 * Uses MovieService to get the search results from The Movie Database.
 * Uses MovieRaterForm to display, edit, add the movie details.
 */
export function AddMoviePage({ onBack, onSave }: AddMoviePageProps) {
    // Search query
    const [query, setQuery] = useState("");
    // Fetched movies list
    const [results, setResults] = useState<TMDbMovie[]>([]);
    // Selected searched movie from the displayed list
    const [selectedMovie, setSelectedMovie] = useState<TMDbMovie | null>(null);

    // Search and Clear buttons on search bar
    const search = () => movieService.handleSearch(query, setResults, () => setSelectedMovie(null));
    const clear = () => {
        setQuery("");
        setResults([]);
    }

    // Autofocus on search bar
    const searchInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (searchInputRef.current)
            searchInputRef.current.focus();
    }, []);

    return <Stack spacing={3}>
        <TitleAndBackButton title="Add New Movie Rating" titleVariant="h5" onBack={onBack} />

        {/* --- SEARCH BAR --- */}
        <Paper elevation={0}>
            <Stack direction="row" spacing={1}>
                <TextField
                    fullWidth
                    label="Search movie title..."
                    value={query}
                    onChange={(e) => setQuery(e.currentTarget.value)}
                    onKeyDown={(e) => e.key === 'Enter' && search()}
                    inputRef={searchInputRef}
                />
                <Button variant="contained" onClick={clear} startIcon={<ClearIcon />}>
                    Clear
                </Button>
                <Button variant="contained" onClick={search} startIcon={<SearchIcon />}>
                    Search
                </Button>
            </Stack>

            {/* --- SEARCH RESULTS --- */}
            {!selectedMovie && results.length > 0 &&
                <Paper elevation={2}>
                    <List sx={{ maxHeight: 300, overflow: 'auto' }}>
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
                </Paper>
            }
        </Paper>

        {/* --- MOVIE FORM (if a movie is chosen) --- */}
        {selectedMovie &&
            <MovieRaterForm movie={selectedMovie} onBack={onBack} onSave={onSave} />
        }
    </Stack>
}