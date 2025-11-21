export type User = {
    email: string;
    password: string;
    username: string;
}

export type TMDbMovie = {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
}

export type SavedMovie = TMDbMovie & {
    review: string;
    rating: number;
    pros: string;
    cons: string;
    favorite: boolean;
}