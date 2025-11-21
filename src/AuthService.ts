import { User } from "./Types";

class AuthService {
    private getUsers(): User[] {
        const userJson = localStorage.getItem("users");
        return userJson ? JSON.parse(userJson) : [];
    }

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
        alert("Successful registration! You can login now");
        onSuccess();
    }

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

    logout() {
        localStorage.removeItem("currentUser");
    }

    getCurrentUser(): string {
        return localStorage.getItem("currentUser");
    }
}

export const authService = new AuthService();