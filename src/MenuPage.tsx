import { Button, Stack, Typography } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import CallMadeIcon from '@mui/icons-material/CallMade';

type MenuPageProps = {
    onLoginClick: (value: boolean) => void;
}

export function MenuPage({ onLoginClick }: MenuPageProps) {
    return <Stack spacing={3} alignItems='center'>
        <Typography variant="h1" gutterBottom>
            The Movie Rater App
        </Typography>
        <Typography variant="h6" gutterBottom>
            The real IMDB copy
        </Typography>

        <Button variant="contained" size='large' startIcon={<LoginIcon />} onClick={() => onLoginClick(true)}>
            Login
        </Button>
        <Button variant="contained" size='large' startIcon={<CallMadeIcon />}>
            Credit
        </Button>

    </Stack>
}