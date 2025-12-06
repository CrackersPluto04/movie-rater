import { Container, Grid, Link, Stack, Typography } from "@mui/material";
import revolutQr from './assets/revolut_qr.png';
import { TitleAndBackButton } from "./TitleAndBackButton";

/**
 * Props definition for SupportPage
 */
type SupportPageProps = {
    /** Called when Back is pressed */
    onBack: () => void;
}

/**
 * Component to show the ways the developers can be supported.
 */
export function SupportPage({ onBack }: SupportPageProps) {
    return <Container maxWidth="lg">
        <TitleAndBackButton title="Support My Work 😀" titleVariant="h4" onBack={onBack} />

        <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing={3}>
                    <Typography variant="h5">
                        Thank you for trying this app!
                    </Typography>
                    <Typography variant="h5">
                        Don't forget to share it with your friends!
                    </Typography>
                    <Typography variant="h5">
                        Buy me a coffee if you like it ☕😀
                    </Typography>
                </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing={2} alignItems="center">
                    <a href="https://revolut.me/benedemuua" target='_blank' rel='noreferrer'>
                        <img
                            src={revolutQr} alt="Revolut QR Code"
                            style={{
                                maxWidth: '200px', borderRadius: '15px',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                                transition: 'transform 0.2s',
                            }}
                            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                        />
                    </a>
                    <Link href="https://revolut.me/benedemuua" target='_blank' underline="hover" rel='noreferrer'
                        sx={{ typography: 'h6', fontWeight: 'bold', color: '#0075EB' }}
                    >
                        @benedemuua
                    </Link>
                </Stack>
            </Grid>
        </Grid>
    </Container>
}