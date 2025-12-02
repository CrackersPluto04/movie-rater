import { Alert, Button, Link, Stack, TextField, Typography } from "@mui/material";
import { useState } from "preact/hooks";
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { authService } from "./AuthService";

type LoginPageProps = {
    onLogin: (username: string) => void;
    onBack: () => void;
}

export function LoginPage({ onLogin, onBack }: LoginPageProps) {
    const [register, setRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    const handleAuth = () => {
        if (register)
            authService.register(email, password, username, setError, () => setRegister(false));
        else
            authService.login(email, password, setError, onLogin);
    };

    return <Stack spacing={2} alignItems='center'>

        <Typography variant="h4" component="h1" gutterBottom>
            {register ? "Register Account" : "Login to your account"}
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <TextField required type='email' label="Email" variant="outlined"
            value={email} onChange={(e) => setEmail(e.currentTarget.value)}
        />

        <TextField required type='password' label="Password" variant="outlined"
            value={password} onChange={(e) => setPassword(e.currentTarget.value)}
        />

        {register &&
            <TextField required label="Username" variant="outlined"
                value={username} onChange={(e) => setUsername(e.currentTarget.value)} />}

        <Button variant="contained" startIcon={register ? <HowToRegIcon /> : <LoginIcon />}
            onClick={handleAuth}
        >
            {register ? "Register" : "Login"}
        </Button>

        <Typography>
            {register ? "Already have an account? " : "Don't have an account? "}
            <Link
                component="button"
                onClick={() => {
                    setRegister(!register);
                    setError("");
                    setEmail("");
                    setPassword("");
                    setUsername("");
                }}>
                {register ? "Login here" : "Register here"}
            </Link>
        </Typography>

        <Button color="secondary" onClick={onBack}>Back to Menu</Button>

    </Stack>
}