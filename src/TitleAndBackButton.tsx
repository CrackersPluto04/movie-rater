import { Grid, Typography, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type TitleAndBackButtonProps = {
    title: string;
    titleVariant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    onBack: () => void;
}

export function TitleAndBackButton({ title, titleVariant, onBack }: TitleAndBackButtonProps) {
    return <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant={titleVariant}>{title}</Typography>
        <Button variant="outlined" onClick={onBack} startIcon={<ArrowBackIcon />}>
            Back
        </Button>
    </Grid>
}