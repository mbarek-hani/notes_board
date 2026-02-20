import { createContext, useEffect, useState } from "react";
import type { User } from "../types";
import { API_URL, loginUser, logoutUser } from "../api";
import { toast } from "react-toastify";

type AuthContextType = {
	user: User | null;
	login: (data: { email: string; password: string }) => Promise<void>;
	logout: () => Promise<void>;
	loading: boolean;
} | null;

export const AuthContext = createContext<AuthContextType>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			setLoading(true);
			try {
				const res = await fetch(`${API_URL}/auth/me`, {
					method: "POST",
					credentials: "include",
				});
				if (!res.ok) {
					throw new Error();
				}
				const data = (await res.json()) as { success: boolean; user: User };
				if (!data.success) throw new Error();
				setUser(data.user);
			} catch {
				setUser(null);
			} finally {
				setLoading(false);
			}
		};
		checkAuth();
	}, []);

	const login = async (data: { email: string; password: string }) => {
		try {
			const res = await loginUser(data);
			setUser(res.user);
		} catch {
			toast.error("Login failed");
		}
	};

	const logout = async () => {
		try {
			await logoutUser();
			setUser(null);
		} catch {
			toast.error("Logout failed");
		}
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, loading }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;
