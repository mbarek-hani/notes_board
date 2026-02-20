import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function useAuthContext() {
	const authContext = useContext(AuthContext);
	if (!authContext) {
		throw new Error("AuthContext must be used inside AuthProvider");
	}
	return authContext;
}
