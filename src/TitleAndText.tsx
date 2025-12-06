import { Grid, Typography } from "@mui/material";

/**
 * Props definition for TitleAndText
 */
type TitleAndTextProps = {
    /** Title's text */
    title: string;
    /** Text's text */
    text: string;
    /** Possible variant of the text */
    variant?: "body1" | "body2" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2";
}

/**
 * Helper component to add a - title: text - combination.
 * Text's variant and text given by the caller.
 * Title's text is given by the caller.
 */
export function TitleAndText({ title, text, variant }: TitleAndTextProps) {
    return <Grid container spacing={1}>
        <Grid size={{ xs: 12, sm: 3 }}>
            <Typography variant="h6" fontStyle="italic">
                {title}:
            </Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 9 }} sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant={variant}>
                {text}
            </Typography>
        </Grid>
    </Grid>
}