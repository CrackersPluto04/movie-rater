import { Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import { SavedMovie } from "./Types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import { movieService } from "./MovieService";

type MovieCardProps = {
    movie: SavedMovie;
    onDelete: () => void;
    onClick: () => void;
    onToggleFavorite?: (id: number) => void;
};

export function MovieCard({ movie, onDelete, onClick, onToggleFavorite }: MovieCardProps) {
    return <Card>
        <CardActionArea onClick={onClick}>

            <CardHeader
                title={movie.title}
                subheader={movie.release_date}
            />

            <CardMedia
                component="img"
                height="300"
                image={movieService.getPosterUrl(movie.poster_path)}
                alt={movie.title}
            />

            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {movie.overview}
                </Typography>
            </CardContent>

        </CardActionArea>

        <CardActions disableSpacing sx={{ justifyContent: 'space-evenly' }}>
            <IconButton aria-label="add to favorites" onClick={() => onToggleFavorite(movie.id)}
                color={movie.favorite ? "error" : "default"}
            >
                <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={onDelete}>
                <DeleteIcon />
            </IconButton>
        </CardActions>

    </Card>
}