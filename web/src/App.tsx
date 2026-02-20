import { Routes, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import NotesProvider from "./contexts/NotesContext";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
	return (
		<>
			<Routes>
				<Route
					path="/notes"
					element={
						<ProtectedRoute>
							<NotesProvider>
								<Notes />
							</NotesProvider>
						</ProtectedRoute>
					}
				/>
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute requiredRole="admin">
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/login"
					element={
						<PublicRoute>
							<Login />
						</PublicRoute>
					}
				/>
				<Route
					path="/register"
					element={
						<PublicRoute>
							<Register />
						</PublicRoute>
					}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
			<ToastContainer
				position="top-right"
				theme="dark"
				toastStyle={{
					backgroundColor: "#555",
					color: "#fff",
				}}
			/>
		</>
	);
}

export default App;
