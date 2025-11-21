const API_KEY = "a0fefeca5ce5668846ec41563b955843";
const BASE_URL = "https://api.themoviedb.org/3";

export type TMDbMovie = {
    id: number;
    title: string;
    desc: string;
    poster_path: string;
    release_date: string;
}

export const MovieApi = {
    searchMovie: async (query: string): Promise<TMDbMovie[]> => {
        if (!query) return [];

        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
        const data = await response.json();

        return data.results || [];
    },

    getPosterUrl: (path: string | null) => {
        return path ? `https://image.tmdb.org/t/p/w500${path}` : "https://placehold.co/500x750?text=No+Image";
    }
};