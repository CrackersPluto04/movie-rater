import { Stack, Typography } from "@mui/material";
import { MovieRaterForm } from "./MovieRaterForm";
import { SavedMovie } from "./Types";

type EditMoviePageProps = {
    movie: SavedMovie;
    onBack: () => void;
    onSave: (movieToSave: SavedMovie) => void;
}

export function EditMoviePage({ movie, onBack, onSave }: EditMoviePageProps) {
    return <Stack spacing={3}>
        <Typography variant="h5">Edit Your Rating</Typography>
        <MovieRaterForm movie={movie} onBack={onBack} onSave={onSave} />
    </Stack>
}