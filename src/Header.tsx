import { AppBar, Toolbar, Typography, IconButton, Button, Container } from '@mui/material';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout';

/**
 * Props definition for HeaderProps
 */
export type HeaderProps = {
    /** Is the page the header is given to a MainPage? */
    isMainPage: boolean;
    /** Called when Logout is pressed */
    onLogout?: () => void;
    /** Current theme of the app - Light or Dark theme */
    mode: 'light' | 'dark';
    /** Called when Dark-Light theme toggler is pressed */
    toggleTheme: () => void;
}

/**
 * Helper component that implements the header's ui and features.
 * Used throughout the app.
 */
export function Header({ isMainPage, onLogout, mode, toggleTheme }: HeaderProps) {
    return <AppBar position="static">
        <Container maxWidth='xl'>
            <Toolbar disableGutters>
                {/* LOGO and TITLE */}
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }}>
                    <MovieFilterIcon />
                </IconButton>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Movie Rater
                </Typography>

                {/* THEME CHANGER */}
                <IconButton onClick={toggleTheme} color="inherit">
                    {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>

                {/* LOGOUT BUTTON (Only after login) */}
                {isMainPage &&
                    <Button color="inherit" onClick={onLogout} endIcon={<LogoutIcon />}>
                        Logout
                    </Button>
                }
            </Toolbar>
        </Container>
    </AppBar>
}