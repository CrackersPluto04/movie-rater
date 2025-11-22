import { Box, Button, Paper, Rating, Stack, TextField, Typography } from "@mui/material";
import { SavedMovie, TMDbMovie } from "./Types";
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "preact/hooks";

type MovieRaterFormProps = {
    movie: SavedMovie | TMDbMovie;
    onBack: () => void;
    onSave: (movieToSave: SavedMovie) => void;
}

export function MovieRaterForm({ movie, onBack, onSave }: MovieRaterFormProps) {
    const [review, setReview] = useState((movie as SavedMovie).review || "");
    const [rating, setRating] = useState<number>((movie as SavedMovie).rating || 0);
    const [pros, setPros] = useState((movie as SavedMovie).pros || "");
    const [cons, setCons] = useState((movie as SavedMovie).cons || "");

    const save = () => {
        const movieToSave: SavedMovie = {
            ...movie,
            review: review,
            rating: rating,
            pros: pros,
            cons: cons,
            favorite: (movie as SavedMovie).favorite || false
        };

        onSave(movieToSave);
        onBack();
    }

    return <Paper elevation={2} sx={{ p: 2 }}>
        {/* Informations about the movie */}
        <Typography variant="h4" gutterBottom>
            About
        </Typography>

        <Typography variant="h5">
            {movie.title}
        </Typography>

        <Typography variant="subtitle1" gutterBottom>
            {movie.release_date}
        </Typography>

        <Typography variant="body1" gutterBottom>
            {movie.overview}
        </Typography>


        {/* Users rating */}
        <Typography variant="h4" gutterBottom>
            Your Review
        </Typography>

        <Stack spacing={2}>
            <Box>
                <Typography component="legend">Rating</Typography>
                <Rating
                    precision={0.5}
                    value={rating}
                    onChange={(event, newValue) => setRating(newValue)}
                    size="large"
                />
            </Box>

            <TextField
                label="Your review"
                multiline rows={2}
                value={review} onChange={(e) => setReview(e.currentTarget.value)}
            />

            <TextField
                label="Pros (What did you like?)"
                multiline rows={2}
                value={pros} onChange={(e) => setPros(e.currentTarget.value)}
            />

            <TextField
                label="Cons (What do you think was bad?)"
                multiline rows={2}
                value={cons} onChange={(e) => setCons(e.currentTarget.value)}
            />

            <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button variant="outlined" color='error' onClick={onBack}>
                    Cancel
                </Button>
                <Button variant="contained" color="success" startIcon={<SaveIcon />} onClick={save}>
                    Save to Collection
                </Button>
            </Stack>
        </Stack>
    </Paper>;
}