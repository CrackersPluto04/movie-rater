/**
 * A user's data.
 */
export type User = {
    email: string;
    password: string;
    username: string;
}

/**
 * Raw movie data structure from The Movie Database (TMDb) APi.
 * Contains only the used parameters.
 */
export type TMDbMovie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
}

/**
 * Data structure of the user's rated and saved movie.
 * Extends TMDbMovie with the user rating parameters.
 */
export type SavedMovie = TMDbMovie & {
    review: string;
    rating: number;
    pros: string;
    cons: string;
    favorite: boolean;
}