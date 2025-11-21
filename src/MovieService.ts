import { SavedMovie, TMDbMovie } from "./Types";

const API_KEY = "a0fefeca5ce5668846ec41563b955843";
const BASE_URL = "https://api.themoviedb.org/3";

class MovieService {
    private getMovies(key: string, username: string): SavedMovie[] {
        const moviesJson = localStorage.getItem(key);
        return moviesJson ? JSON.parse(moviesJson) : [];
    }

    async searchMovie(query: string): Promise<TMDbMovie[]> {
        if (!query) return [];

        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
        const data = await response.json();

        return data.results || [];
    }

    async handleSearch(query: string, setResults: (movies: TMDbMovie[]) => void, setSelectedMovie: () => void) {
        if (!query) return;
        const movies = await this.searchMovie(query);
        setResults(movies);
        setSelectedMovie();
    }

    saveMovie(newMovie: SavedMovie, username: string) {
        const key = `movies_${username}`;
        const existingMovies = this.getMovies(key, username);
        existingMovies.push(newMovie);

        localStorage.setItem(key, JSON.stringify(existingMovies));

        alert(`Movie "${newMovie.title}" saved successfully!`);
    }

    deleteMovie(id: number, username: string) {
        const key = `movies_${username}`;
        const existingMovies = this.getMovies(key, username);
        const updatedMovies = existingMovies.filter(m => m.id !== id);

        localStorage.setItem(key, JSON.stringify(updatedMovies));

        alert("Movie deleted successfully!");
    }

    getPosterUrl(path: string | null) {
        return path ? `https://image.tmdb.org/t/p/w500${path}` : "https://placehold.co/500x750?text=No+Image";
    }
};

export const movieService = new MovieService();