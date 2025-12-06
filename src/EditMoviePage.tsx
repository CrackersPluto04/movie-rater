import { Stack } from "@mui/material";
import { MovieRaterForm } from "./MovieRaterForm";
import { SavedMovie } from "./Types";
import { TitleAndBackButton } from "./TitleAndBackButton";

/**
 * Props definition for EditMoviePage
 */
type EditMoviePageProps = {
    /** The movie the user wants to edit */
    movie: SavedMovie;
    /** Called when Back is pressed */
    onBack: () => void;
    /** Called when Save is pressed */
    onSave: (movieToSave: SavedMovie) => void;
}

/**
 * Component to edit the chosen rated movie.
 * Uses MovieRaterForm to display and edit the movie details.
 */
export function EditMoviePage({ movie, onBack, onSave }: EditMoviePageProps) {
    return <Stack spacing={3}>
        <TitleAndBackButton title="Edit Your Rating" titleVariant="h5" onBack={onBack} />
        <MovieRaterForm movie={movie} onBack={onBack} onSave={onSave} />
    </Stack>
}