import useAuthContext from "../hooks/useAuthContext";
import Spinner from "./icons/Spinner";
import { Navigate } from "react-router-dom";

export default function PublicRoute({
	children,
}: {
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

	if (user && user.role === "admin") {
		return <Navigate to="/dashboard" replace />;
	}

	if (user && user.role !== "admin") {
		return <Navigate to="/notes" replace />;
	}

	return children;
}
