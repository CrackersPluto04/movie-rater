import { Stack, Typography } from "@mui/material";
import { MovieRaterForm } from "./MovieRaterForm";
import { SavedMovie } from "./Types";

type InfoPageProps = {
    movie: SavedMovie;
    onBack: () => void;
}

export function InfoPage({ movie, onBack }: InfoPageProps) {
    return <Stack spacing={3}>
        <Typography variant="h5">Your Rated Movie</Typography>
        <MovieRaterForm movie={movie} onBack={onBack} onlyView={true} />
    </Stack>
}