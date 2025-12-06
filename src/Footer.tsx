import { Box, Container, Typography, Stack, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

/**
 * Helper component that implements the footer's ui and features.
 * Used throughout the app.
 */
export function Footer() {
    return <Box component="footer" sx={{ bgcolor: 'background.paper', py: 3, mt: 'auto' }}>
        <Container maxWidth="xl">
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' },
                gap: 2,
                alignItems: 'center'
            }}>

                <Box sx={{ justifySelf: { xs: 'center', sm: 'start' } }}>
                    <Link href="https://www.vik.bme.hu/" target="_blank" underline="none" rel='noreferrer'>
                        <Typography variant="h6" color="text.primary">
                            BME VIK
                        </Typography>
                    </Link>
                </Box>

                <Box sx={{ justifySelf: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        © 2025 Movie Rater App
                    </Typography>
                </Box>

                <Box sx={{ justifySelf: { xs: 'center', sm: 'end' } }}>
                    <Stack direction="row" spacing={1}>
                        <IconButton href="https://www.facebook.com/benedek.szabo.0414" target="_blank" aria-label="facebook" rel='noreferrer'>
                            <FacebookIcon />
                        </IconButton>
                        <IconButton href="https://www.instagram.com/benedek.szabo_04.14" target="_blank" aria-label="instagram" rel='noreferrer'>
                            <InstagramIcon />
                        </IconButton>
                        <IconButton href="https://github.com/CrackersPluto04" target="_blank" aria-label="github" rel='noreferrer'>
                            <GitHubIcon />
                        </IconButton>
                    </Stack>
                </Box>

            </Box>
        </Container>
    </Box>
}