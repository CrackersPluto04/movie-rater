import { Button, Stack, Typography } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import CallMadeIcon from '@mui/icons-material/CallMade';

/**
 * Props definition for MenuPage
 */
type MenuPageProps = {
    /** Called when Login is pressed */
    onLoginClick: (value: boolean) => void;
    /** Called when Support Me is pressed */
    onSupportClick: (value: boolean) => void;
}

/**
 * Component for the main menu.
 * Visible when the user isnt logged in.
 */
export function MenuPage({ onLoginClick, onSupportClick }: MenuPageProps) {
    return <Stack spacing={10} alignItems='center'>
        <Stack spacing={1}>
            <Typography variant="h1" textAlign='center'
                sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: '2.5rem', sm: '4rem', md: '6rem' }
                }}
            >
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