import { render } from 'preact';
import './index.css';
import './Pwa';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect, useMemo, useState } from 'preact/hooks';
import { LoginPage } from './LoginPage'
import { MainPage } from './MainPage';
import { MenuPage } from './MenuPage';
import { authService } from './AuthService';
import { PageContainer } from './PageContainer';

function App() {
	// light or dark theme
	const [mode, setMode] = useState<"light" | "dark">(() => {
		return (localStorage.getItem("theme") as ("light" | "dark")) || "light";
	});
	const [login, setLogin] = useState(false);
	const [user, setUser] = useState(() => {
		return authService.getCurrentUser() || "";
	});

	const theme = useMemo(() => createTheme({
		palette: {
			mode: mode,
		},
	}), [mode]);

	const toggleTheme = () => {
		const newMode = mode === "light" ? "dark" : "light";
		setMode(newMode);
		localStorage.setItem("theme", newMode);
	};

	return <ThemeProvider theme={theme}>
		<CssBaseline />

		{login ?
			<PageContainer justifyContent="center" alignItems="center"
				isLoggedIn={false} mode={mode} toggleTheme={toggleTheme}
			>
				<LoginPage onLogin={(username) => { setLogin(false); setUser(username) }}
					onBack={() => setLogin(false)} />
			</PageContainer>
			:
			(user ?
				<PageContainer isLoggedIn={true} onLogout={() => { authService.logout(); setUser("") }}
					mode={mode} toggleTheme={toggleTheme}
				>
					<MainPage />
				</PageContainer>
				:
				<PageContainer isLoggedIn={false} mode={mode} toggleTheme={toggleTheme}>
					<MenuPage onLoginClick={setLogin} />
				</PageContainer>
			)}
	</ThemeProvider>
}

render(<App />, document.getElementById('app'));
