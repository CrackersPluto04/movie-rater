import { Stack, Typography } from "@mui/material";
import { MovieRaterForm } from "./MovieRaterForm";
import { SavedMovie } from "./Types";
import { TitleAndBackButton } from "./TitleAndBackButton";

/**
 * Props definition for InfoPage
 */
type InfoPageProps = {
    /** The movie the user wants to check */
    movie: SavedMovie;
    /** Called when Back is pressed */
    onBack: () => void;
}

/**
 * Component to view one of the users rated movie.
 * Its informations and ratings are shown as readonly - onlyView = true.
 */
export function InfoPage({ movie, onBack }: InfoPageProps) {
    return <Stack spacing={3}>
        <TitleAndBackButton title="Your Rated Movie" titleVariant="h5" onBack={onBack} />
        <MovieRaterForm movie={movie} onBack={onBack} onlyView={true} />
    </Stack>
}