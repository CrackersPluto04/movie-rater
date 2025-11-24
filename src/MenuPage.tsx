import { Button, Stack, Typography } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import CallMadeIcon from '@mui/icons-material/CallMade';

type MenuPageProps = {
    onLoginClick: (value: boolean) => void;
    onSupportClick: (value: boolean) => void;
}

export function MenuPage({ onLoginClick, onSupportClick }: MenuPageProps) {
    return <Stack spacing={10} alignItems='center'>
        <Stack spacing={1}>
            <Typography variant="h1" textAlign='center'>
                The Movie Rater App
            </Typography>
            <Typography variant="h5" gutterBottom textAlign='center'>
                The real IMDB copy
            </Typography>
        </Stack>

        <Stack spacing={3}>
            <Button variant="contained" size='large' startIcon={<LoginIcon />} onClick={() => onLoginClick(true)}>
                Login
            </Button>
            <Button variant="contained" size='large' startIcon={<CallMadeIcon />} onClick={() => onSupportClick(true)}>
                Support Me
            </Button>
        </Stack>

    </Stack>
}