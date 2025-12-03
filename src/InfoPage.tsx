import { Stack, Typography } from "@mui/material";
import { MovieRaterForm } from "./MovieRaterForm";
import { SavedMovie } from "./Types";
import { TitleAndBackButton } from "./TitleAndBackButton";

type InfoPageProps = {
    movie: SavedMovie;
    onBack: () => void;
}

export function InfoPage({ movie, onBack }: InfoPageProps) {
    return <Stack spacing={3}>
        <TitleAndBackButton title="Your Rated Movie" titleVariant="h5" onBack={onBack} />
        <MovieRaterForm movie={movie} onBack={onBack} onlyView={true} />
    </Stack>
}