import { Box, Button, Divider, Grid, Paper, Rating, Stack, TextField, Typography } from "@mui/material";
import { SavedMovie, TMDbMovie } from "./Types";
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "preact/hooks";
import { movieService } from "./MovieService";
import { TitleAndText } from "./TitleAndText";

type MovieRaterFormProps = {
    movie: SavedMovie | TMDbMovie;
    onBack: () => void;
    onSave?: (movieToSave: SavedMovie) => void;
    onlyView?: boolean;
}

export function MovieRaterForm({ movie, onBack, onSave = () => { }, onlyView = false }: MovieRaterFormProps) {
    const [review, setReview] = useState((movie as SavedMovie).review || "");
    const [rating, setRating] = useState<number | null>((movie as SavedMovie).rating || 1);
    const [pros, setPros] = useState((movie as SavedMovie).pros || "");
    const [cons, setCons] = useState((movie as SavedMovie).cons || "");

    const save = () => {
        const movieToSave: SavedMovie = {
            ...movie,
            review: review,
            rating: rating,
            pros: pros,
            cons: cons,
            favorite: (movie as SavedMovie).favorite || false
        };

        onSave(movieToSave);
        onBack();
    }

    return <Paper elevation={2} sx={{ pl: 4, pr: 4, pt: 2, pb: 2 }}>
        <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 8 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Stack spacing={3}>
                    <Stack spacing={1}>
                        {/* Informations about the movie */}
                        <Typography variant="h4" textAlign="center">
                            About
                        </Typography>

                        <TitleAndText title="Title" text={movie.title} variant="h5" />

                        <TitleAndText title="Release Date" text={movie.release_date} variant="subtitle1" />

                        <TitleAndText title="Description" text={movie.overview} variant="body1" />
                    </Stack>

                    <Divider variant="middle" flexItem />

                    <Stack spacing={2}>
                        {/* Users rating */}
                        <Typography variant="h4" textAlign="center">
                            Your Review
                        </Typography>

                        <Stack direction='row' spacing={2}>
                            <Typography component="legend">Rating:</Typography>
                            <Rating
                                precision={0.5}
                                value={rating}
                                onChangeActive={(event, newHover) => {
                                    setRating(newHover > 0 ? newHover : rating);
                                }}
                                size="large"
                                readOnly={onlyView}
                            />
                        </Stack>

                        <TextField
                            label="Your review"
                            multiline rows={2}
                            value={review} onChange={(e) => setReview(e.currentTarget.value)}
                            slotProps={{
                                input: {
                                    readOnly: onlyView
                                }
                            }}
                        />

                        <TextField
                            label="Pros (What did you like?)"
                            multiline rows={2}
                            value={pros} onChange={(e) => setPros(e.currentTarget.value)}
                            slotProps={{
                                input: {
                                    readOnly: onlyView
                                }
                            }}
                        />

                        <TextField
                            label="Cons (What do you think was bad?)"
                            multiline rows={2}
                            value={cons} onChange={(e) => setCons(e.currentTarget.value)}
                            slotProps={{
                                input: {
                                    readOnly: onlyView
                                }
                            }}
                        />

                        <Stack direction="row" spacing={2} justifyContent="flex-end">
                            <Button variant="outlined" color='error' onClick={onBack}>
                                {onlyView ? "Back" : "Cancel"}
                            </Button>
                            {!onlyView &&
                                <Button variant="contained" color="success" startIcon={<SaveIcon />} onClick={save}>
                                    Save to Collection
                                </Button>}
                        </Stack>
                    </Stack>
                </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={movieService.getPosterUrl(movie.poster_path)}
                    alt="Movie's poster"
                    style={{ width: '100%', borderRadius: '8px' }} />
            </Grid>
        </Grid>
    </Paper>;
}