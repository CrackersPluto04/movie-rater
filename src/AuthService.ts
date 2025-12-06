import { User } from "./Types";

/**
 * Class that handes the registration and login processes
 * Email and Username are unique
 */
class AuthService {
    /**
     * Private getter that returns all the registered users
     * @returns List of the users
     */
    private getUsers(): User[] {
        const userJson = localStorage.getItem("users");
        return userJson ? JSON.parse(userJson) : [];
    }

    /**
     * Handles the registration process
     * Checks if credentials are available then registers or shows error message
     * @param email Email to register with
     * @param password Password to register with
     * @param username Username to register with
     * @param setError Callback function to call if any credential cant be used
     * @param onSuccess Callback function to call if registration was succesful
     */
    register(email: string, password: string, username: string,
        setError: (msg: string) => void, onSuccess: () => void
    ) {
        if (email === "" || password === "" || username === "") {
            setError("Please fill all the required fields");
            return
        }

        const users = this.getUsers();

        if (users.some(u => u.email === email || u.username === username)) {
            setError("An account with this Email or Username already exists");
            return
        }

        users.push({ email, password, username });
        localStorage.setItem("users", JSON.stringify(users));

        // Show push notification on successful registration
        if (Notification.permission === 'granted') {
            navigator.serviceWorker.ready.then(registration => {
                registration.showNotification('Movie Rater', {
                    body: 'Successful registration! You can login now.',
                    tag: 'registration-success'
                });
            });
        } else {
            // Fallback alert if notifications are not permitted
            alert("Successful registration! You can login now");
        }

        onSuccess();
    }

    /**
     * Handles the login process
     * Checks if credentials are valid then logs in or shows error message
     * @param email Email to register with
     * @param password Password to register with
     * @param setError Callback function to call if any credential is invalid
     * @param onSuccess Callback function to call if login was succesful
     */
    login(email: string, password: string,
        setError: (msg: string) => void, onSuccess: (username: string) => void
    ) {
        const users = this.getUsers();

        const validUser = users.find(u => u.email === email && u.password === password);
        if (validUser) {
            localStorage.setItem("currentUser", validUser.username);
            onSuccess(validUser.username);
            return
        }

        setError("Invalid Email or Password");
    }

    /**
     * Logs out the currently logged in user
     */
    logout() {
        localStorage.removeItem("currentUser");
    }

    /**
     * Return the currently logged in user
     * It is an [] if there isnt any
     * @returns 
     */
    getCurrentUser(): string {
        return localStorage.getItem("currentUser");
    }
}

export const authService = new AuthService();