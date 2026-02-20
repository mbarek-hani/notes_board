import { Navigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import Spinner from "./icons/Spinner";

export default function ProtectedRoute({
	requiredRole,
	children,
}: {
	requiredRole?: string;
	children: React.ReactNode;
}) {
	const { user, loading } = useAuthContext();

	if (loading)
		return (
			<div
				style={{
					minHeight: "100vh",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Spinner size="100" />
			</div>
		);

	if (!user) {
		return <Navigate to="/login" />;
	}

	if (requiredRole && user.role !== requiredRole) {
		return <Navigate to="/" />;
	}

	return children;
}
