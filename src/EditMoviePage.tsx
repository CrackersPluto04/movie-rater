import { MovieRaterForm } from "./MovieRaterForm";
import { SavedMovie } from "./Types";

type EditMoviePageProps = {
    movie: SavedMovie;
    onBack: () => void;
    onSave: (movieToSave: SavedMovie) => void;
}

export function EditMoviePage({ movie, onBack, onSave }: EditMoviePageProps) {
    return <MovieRaterForm movie={movie} onBack={onBack} onSave={onSave} />;
}