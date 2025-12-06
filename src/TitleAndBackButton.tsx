import { Grid, Typography, Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

/**
 * Props definition for TitleAndBackButton
 */
type TitleAndBackButtonProps = {
    /** Title's text */
    title: string;
    /** Possible variant of the title */
    titleVariant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    /** Called when Back is pressed */
    onBack: () => void;
}

/**
 * Helper component to add a title and back button to the page.
 * Title's variant and text given by the caller.
 */
export function TitleAndBackButton({ title, titleVariant, onBack }: TitleAndBackButtonProps) {
    return <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant={titleVariant}>{title}</Typography>
        <Button variant="outlined" onClick={onBack} startIcon={<ArrowBackIcon />}>
            Back
        </Button>
    </Grid>
}