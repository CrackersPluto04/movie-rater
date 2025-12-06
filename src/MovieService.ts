import { SavedMovie, TMDbMovie } from "./Types";

// Api key and link for fetching the movies from The Movie Database
const API_KEY = "a0fefeca5ce5668846ec41563b955843";
const BASE_URL = "https://api.themoviedb.org/3";

/**
 * Class that handles the movie functions / interactions
 * Handling database fetch, given json
 */
class MovieService {
    /**
     * Getter for the user's rated movies list
     * @param username User's username
     * @returns User's rated movies
     */
    getMovies(username: string): SavedMovie[] {
        const key = `movies_${username}`;
        const moviesJson = localStorage.getItem(key);
        return moviesJson ? JSON.parse(moviesJson) : [];
    }

    /**
     * Fetches the searced movie, where the query is the search.
     * Check for containment (not if equal)
     * @param query Searched movie title
     * @returns Fetched movies containing the query
     */
    async searchMovie(query: string): Promise<TMDbMovie[]> {
        if (!query) return [];

        const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
        const data = await response.json();

        return data.results || [];
    }

    /**
     * Handles the whole search and set process.
     * Uses the searchMovie function to fetch the movies.
     * @param query Searched movie title
     * @param setResults Callback function. Gives back the fetched movies as parameter
     * @param setSelectedMovie Callback function
     */
    async handleSearch(query: string, setResults: (movies: TMDbMovie[]) => void, setSelectedMovie: () => void) {
        if (!query) return;
        const movies = await this.searchMovie(query);
        setResults(movies);
        setSelectedMovie();
    }

    /**
     * Saves the given rated movie to the user's movie list
     * @param newMovie Movie to save
     * @param username Current user's username
     */
    saveMovie(newMovie: SavedMovie, username: string) {
        const key = `movies_${username}`;
        const existingMovies = this.getMovies(username);
        const idx = existingMovies.findIndex(m => m.id === newMovie.id);

        // If rated movie already exists then its an edit, switches it
        if (idx !== -1)
            existingMovies[idx] = newMovie;
        // Else just pushes it to the list
        else
            existingMovies.push(newMovie);

        localStorage.setItem(key, JSON.stringify(existingMovies));

        alert(`Movie "${newMovie.title}" saved successfully!`);
    }

    /**
     * Deletes the movie with the given ID from the user's rated movie list
     * @param id Movie's ID to delete
     * @param username Current user's username
     */
    deleteMovie(id: number, username: string) {
        const key = `movies_${username}`;
        const existingMovies = this.getMovies(username);
        const updatedMovies = existingMovies.filter(m => m.id !== id);

        localStorage.setItem(key, JSON.stringify(updatedMovies));
    }

    /**
     * Toggles wether the movie is favorited or not
     * @param id Movie's ID to favorite or unfavorite
     * @param username Current user's username
     */
    toggleFavorite(id: number, username: string) {
        const key = `movies_${username}`;
        const existingMovies = this.getMovies(username);
        for (let movie of existingMovies) {
            if (movie.id === id) {
                movie.favorite = !movie.favorite;
                break;
            }
        }
        localStorage.setItem(key, JSON.stringify(existingMovies));
    }

    /**
     * Gets the movie's poster by its path
     * @param path Path of the movie's poster
     * @returns The movie's poster if exists, placeholder else
     */
    getPosterUrl(path: string | null) {
        return path ? `https://image.tmdb.org/t/p/w500${path}` : "https://placehold.co/500x750?text=No+Image";
    }
};

export const movieService = new MovieService();