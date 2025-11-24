import { Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, IconButton, Stack, Typography } from "@mui/material";
import { SavedMovie } from "./Types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { movieService } from "./MovieService";

type MovieCardProps = {
    movie: SavedMovie;
    onDelete: () => void;
    onClick: () => void;
    onToggleFavorite?: () => void;
    onInfo: () => void;
};

export function MovieCard({ movie, onDelete, onClick, onToggleFavorite, onInfo }: MovieCardProps) {
    return <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <CardActionArea onClick={onClick}>

            <CardHeader
                title={movie.title}
                subheader={movie.release_date}
            />

            <CardMedia
                component="img"
                height="400"
                image={movieService.getPosterUrl(movie.poster_path)}
                alt={movie.title}
                style={{ objectFit: 'contain' }}
            />

            <CardContent sx={{ flexGrow: 1, p: 1.5 }}>
                <Typography variant="body1" color='textSecondary' sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 4,
                }}>
                    {movie.overview}
                </Typography>
            </CardContent>

        </CardActionArea>

        <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
            <Stack direction="row">
                <IconButton aria-label="add to favorites" onClick={onToggleFavorite}
                    color={movie.favorite ? 'error' : 'default'}
                >
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={onDelete}>
                    <DeleteIcon />
                </IconButton>
            </Stack>

            <IconButton aria-label="more" onClick={onInfo}>
                <InfoIcon />
            </IconButton>
        </CardActions>

    </Card>
}