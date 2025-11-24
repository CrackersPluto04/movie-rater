import { AppBar, Toolbar, Typography, IconButton, Button, Container } from '@mui/material';
import MovieFilterIcon from '@mui/icons-material/MovieFilter'; // Logo ikon
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout';

export type HeaderProps = {
    isMainPage: boolean;
    onLogout?: () => void;
    mode: 'light' | 'dark';
    toggleTheme: () => void;
}

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

                {/* 3. LOGOUT BUTTON (Only after login) */}
                {isMainPage &&
                    <Button color="inherit" onClick={onLogout} endIcon={<LogoutIcon />}>
                        Logout
                    </Button>
                }
            </Toolbar>
        </Container>
    </AppBar>
}