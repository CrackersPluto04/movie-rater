import { render } from 'preact';
import './Pwa';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useMemo, useState } from 'preact/hooks';
import { LoginPage } from './LoginPage'
import { MainPage } from './MainPage';
import { MenuPage } from './MenuPage';
import { authService } from './AuthService';
import { PageContainer } from './PageContainer';
import { SupportPage } from './SupportPage';

/**
 * The app's entrance.
 * Opens on Menu then can navigato to Login or Support
 * or Main page after login
 */
function App() {
	// Light or dark theme
	const [mode, setMode] = useState<"light" | "dark">(() => {
		return (localStorage.getItem("theme") as ("light" | "dark")) || "light";
	});
	// Variables for the pages to help what to load
	const [login, setLogin] = useState(false);
	const [support, setSupport] = useState(false);
	const [user, setUser] = useState(() => {
		return authService.getCurrentUser() || "";
	});

	// Setting the theme
	const theme = useMemo(() => createTheme({
		palette: {
			mode: mode,
		},
	}), [mode]);

	// Toggles the theme
	const toggleTheme = () => {
		const newMode = mode === "light" ? "dark" : "light";
		setMode(newMode);
		localStorage.setItem("theme", newMode);
	};

	return <ThemeProvider theme={theme}>
		<CssBaseline />

		{/* Login page if login button pressed */}
		{login &&
			<PageContainer justifyContent="center" alignItems="center"
				isMainPage={false} mode={mode} toggleTheme={toggleTheme}
			>
				<LoginPage onLogin={(username) => { setLogin(false); setUser(username) }}
					onBack={() => setLogin(false)} />
			</PageContainer>
		}

		{/* Support page if support me button pressed */}
		{support &&
			<PageContainer justifyContent="center" alignItems="center"
				isMainPage={false} mode={mode} toggleTheme={toggleTheme}
			>
				<SupportPage onBack={() => setSupport(false)} />
			</PageContainer>
		}

		{/* Main page if login was succesful */}
		{user &&
			<PageContainer isMainPage={true} onLogout={() => { authService.logout(); setUser("") }}
				mode={mode} toggleTheme={toggleTheme}
			>
				<MainPage user={user} />
			</PageContainer>
		}

		{/* Menu page opens default */}
		{!login && !support && !user &&
			<PageContainer justifyContent="center" alignItems="center"
				isMainPage={false} mode={mode} toggleTheme={toggleTheme}
			>
				<MenuPage onLoginClick={setLogin} onSupportClick={setSupport} />
			</PageContainer>
		}

	</ThemeProvider>
}

// Push notification implementation
Notification.requestPermission();

render(<App />, document.getElementById('app'));
