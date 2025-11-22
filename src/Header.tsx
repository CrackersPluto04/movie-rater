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
                {/* 1. LOGO és CÍM */}
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 1 }}>
                    <MovieFilterIcon />
                </IconButton>

                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Movie Rater
                </Typography>

                {/* 2. LOGOUT GOMB (Csak ha MainPage-en vagyunk) */}
                {isMainPage &&
                    <Button color="inherit" onClick={onLogout} endIcon={<LogoutIcon />}>
                        Logout
                    </Button>
                }

                {/* 3. TÉMA VÁLTÓ (Mindig ott van) */}
                <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
                    {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </Toolbar>
        </Container>
    </AppBar>
}