import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

/**
 * Props definition for ConfirmDialog
 */
type ConfirmDialogProps = {
    /** When should the dialog appear */
    open: boolean;
    /** Dialog title */
    title: string;
    /** Dialog text */
    content: string;
    /** Called when Delete is pressed on the dialog */
    onConfirm: () => void;
    /** Called when Cancel is pressed on the dialog */
    onCancel: () => void;
}

/**
 * Helper component for confirmation dialogs
 */
export function ConfirmDialog({ open, title, content, onConfirm, onCancel }: ConfirmDialogProps) {
    return <Dialog
        open={open}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">
            {title}
        </DialogTitle>

        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {content}
            </DialogContentText>
        </DialogContent>

        <DialogActions >
            <Button onClick={onCancel} color="primary">
                Cancel
            </Button>
            <Button onClick={onConfirm} color="error" variant="contained" autoFocus>
                Delete
            </Button>
        </DialogActions>
    </Dialog>
}