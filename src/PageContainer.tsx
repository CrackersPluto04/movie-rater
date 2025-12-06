import { Box, Container } from "@mui/material";
import { ReactNode } from "preact/compat"
import { Header, HeaderProps } from "./Header";
import { Footer } from "./Footer";

/**
 * Props definition for PageContainer.
 * Requires HeaderProps since component uses Header.
 */
type PageContainerProps = HeaderProps & {
    /** Children component that is put inside of PageContainer */
    children: ReactNode;
    justifyContent?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
    alignItems?: "flex-start" | "center" | "flex-end" | "stretch";
}

/**
 * Custom container component for the pages
 * to give the app a base design
 * with header, footer, and alignment of items.
 * The content's vertical and horizontal alignment is adjustable
 */
export function PageContainer({ children, justifyContent = "flex-start", alignItems = "stretch",
    ...headerProps }: PageContainerProps) {

    return <Box sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: 'column',
    }}>
        <Header {...headerProps} />

        <Box component='main' sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: justifyContent,
            alignItems: alignItems,
            py: 4
        }}>
            <Container maxWidth='xl'>
                {children}
            </Container>
        </Box>

        <Footer />
    </Box>
}